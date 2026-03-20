import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { employees } from '../data/employees';
import { auth } from '../lib/firebase';
import {
  ensureUserProfile,
  saveNotifyRequest,
  subscribeUserNotifyRequests,
  subscribeUserOutputs,
  subscribeUserProfile,
  subscribeUserTasks,
} from '../lib/userStore';
import './Dashboard.css';

const getFirstName = (user) => {
  const displayName = user?.displayName?.trim();
  if (displayName) {
    return displayName.split(/\s+/)[0];
  }

  const email = user?.email?.trim();
  if (email && email.includes('@')) {
    const localPart = email.split('@')[0] || '';
    const cleaned = localPart.split(/[._-]/)[0] || localPart;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return 'there';
};

const formatDateTime = (value) => {
  if (!value) return 'Not available';

  let dateObj = null;
  if (typeof value?.toDate === 'function') {
    dateObj = value.toDate();
  } else if (value instanceof Date) {
    dateObj = value;
  } else if (typeof value === 'string' || typeof value === 'number') {
    dateObj = new Date(value);
  }

  if (!dateObj || Number.isNaN(dateObj.getTime())) return 'Not available';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateObj);
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const [authUser, setAuthUser] = useState(null);
  const [firstName, setFirstName] = useState('there');
  const [profileData, setProfileData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [notifyRequests, setNotifyRequests] = useState([]);
  const [notifyLoadingBySlug, setNotifyLoadingBySlug] = useState({});
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthUser(null);
        setProfileData(null);
        setTasks([]);
        setOutputs([]);
        setFirstName('there');
        navigate('/login');
        return;
      }

      setAuthUser(user);
      setFirstName(getFirstName(user));
      ensureUserProfile(user).catch(() => {
        setError('Unable to sync your profile right now.');
      });
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!authUser?.uid) return undefined;

    const unsubs = [
      subscribeUserProfile(authUser.uid, setProfileData, () => setError('Unable to read profile data right now.')),
      subscribeUserTasks(authUser.uid, setTasks, () => setError('Unable to read tasks right now.')),
      subscribeUserOutputs(authUser.uid, setOutputs, () => setError('Unable to read outputs right now.')),
      subscribeUserNotifyRequests(authUser.uid, setNotifyRequests, () => setError('Unable to read notify requests right now.')),
    ];

    return () => {
      unsubs.forEach((unsub) => {
        if (typeof unsub === 'function') unsub();
      });
    };
  }, [authUser?.uid]);

  const activeTab = ['home', 'employees', 'tasks', 'outputs', 'profile'].includes(tab) ? tab : 'home';

  const activeTeammateSlug = profileData?.activeTeammate || '';
  const activeTeammate = useMemo(
    () => employees.find((employee) => employee.slug === activeTeammateSlug) || null,
    [activeTeammateSlug]
  );
  const catalogEmployees = useMemo(
    () => employees.filter((employee) => employee.slug !== activeTeammateSlug),
    [activeTeammateSlug]
  );
  const allEmployees = useMemo(() => {
    const ordered = [...employees];
    if (!activeTeammateSlug) return ordered;
    return ordered.sort((a, b) => {
      if (a.slug === activeTeammateSlug) return -1;
      if (b.slug === activeTeammateSlug) return 1;
      return 0;
    });
  }, [activeTeammateSlug]);
  const filteredEmployees = useMemo(() => {
    const q = employeeSearch.trim().toLowerCase();
    if (!q) return allEmployees;
    return allEmployees.filter((employee) => {
      return [
        employee.name,
        employee.role,
        employee.specialty,
        employee.employeeTag,
        employee.description,
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q));
    });
  }, [allEmployees, employeeSearch]);
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const teammateStage = profileData?.teammateStage || profileData?.teammateStatus || '';
  const teammateNextStep = profileData?.teammateNextStep || profileData?.teammateProcess || '';
  const latestOutput = outputs[0] || null;
  const teammateSummary = latestOutput?.title || latestOutput?.summary || 'No output yet.';

  const lastLoginLabel = formatDateTime(profileData?.lastLoginAt);
  const accountCreatedLabel = formatDateTime(authUser?.metadata?.creationTime || profileData?.createdAt);
  const nameLabel = profileData?.fullName || authUser?.displayName || 'Not provided';
  const emailLabel = profileData?.email || authUser?.email || 'Not provided';
  const requestedSlugs = useMemo(() => new Set(notifyRequests.map((item) => item.slug || item.id)), [notifyRequests]);
  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  };

  const handleNotifyMe = async (employee) => {
    if (!authUser?.uid || !employee?.slug) {
      navigate('/login');
      return;
    }

    if (requestedSlugs.has(employee.slug)) return;

    try {
      setNotifyLoadingBySlug((prev) => ({ ...prev, [employee.slug]: true }));
      await saveNotifyRequest(authUser.uid, employee.slug, {
        teammateName: employee.name,
        teammateRole: employee.role,
        email: authUser.email || emailLabel || '',
        fullName: authUser.displayName || nameLabel || '',
      });
    } catch (e) {
      setError('Could not save your notify request right now.');
    } finally {
      setNotifyLoadingBySlug((prev) => ({ ...prev, [employee.slug]: false }));
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dash-bg-layer" aria-hidden="true">
        <div className="dash-orb dash-orb--one" />
        <div className="dash-orb dash-orb--two" />
        <div className="dash-orb dash-orb--three" />
      </div>

      <Link className="dash-home-logo" to="/">
        <img src="/logo_nobg.png" alt="Veda logo" />
        <span>VEDA</span>
      </Link>

      <div className="dashboard-shell">
        <motion.section className="dash-hero glass-panel" {...fadeUp}>
          <div className="dash-hero-left">
            <div>
              <p className="dash-label">
                {activeTab === 'home' && 'Your Workspace'}
                {activeTab === 'employees' && 'Your Team'}
                {activeTab === 'tasks' && 'Execution Board'}
                {activeTab === 'outputs' && 'Recent Outputs'}
                {activeTab === 'profile' && 'My Profile'}
              </p>
              <h1>
                {activeTab === 'home' && `Welcome back, ${firstName}`}
                {activeTab === 'employees' && 'Team Overview'}
                {activeTab === 'tasks' && 'Work in Progress'}
                {activeTab === 'outputs' && 'Output Timeline'}
                {activeTab === 'profile' && `Profile of ${firstName}`}
              </h1>
              <p className="dash-sub">
                {activeTab === 'home' && 'Track your workspace, progress, and next steps from one place.'}
                {activeTab === 'employees' && 'This page reflects your real teammate assignments from profile data.'}
                {activeTab === 'tasks' && 'These are your live tasks from your workspace data.'}
                {activeTab === 'outputs' && 'These are your live outputs from your workspace data.'}
                {activeTab === 'profile' && 'All saved account and profile values are shown below.'}
              </p>
            </div>
            <div className="dash-hero-status">
              <div className="dash-status-chip">
                Active teammate: {activeTeammate ? activeTeammate.name : 'None'}
              </div>
              <div className="dash-status-chip">Tasks: {tasks.length}</div>
              <div className="dash-status-chip">Outputs: {outputs.length}</div>
              <div className="dash-status-chip">{todayLabel}</div>
            </div>
          </div>

          <div className="dash-hero-right">
            <p className="dash-brand">Current Workspace</p>
            <p className="dash-right-text">
              {activeTeammate
                ? `${activeTeammate.name} is currently connected to your workspace.`
                : 'No teammate is assigned yet. Once assigned, actions and status will appear here.'}
            </p>
            <Link className="dash-hero-cta" to={activeTeammate ? `/employees/${activeTeammate.slug}` : '/dashboard/employees'}>
              {activeTeammate ? `Open ${activeTeammate.name}` : 'Browse teammates'}
            </Link>
          </div>
        </motion.section>

        {activeTab === 'home' && activeTeammate && (
          <motion.section className="dash-emma glass-panel" {...fadeUp}>
            <div className="dash-emma-head">
              <div className="dash-avatar" style={{ '--employee-color': activeTeammate.color }}>{activeTeammate.name[0]}</div>
              <div>
                <p className="dash-label">Teammate Workspace</p>
                <h2>{activeTeammate.name}</h2>
                <p className="dash-emma-role">{activeTeammate.role}</p>
                <p className="dash-emma-status">Current stage: {teammateStage || 'Not set'}</p>
                <p className="dash-emma-status">Next step: {teammateNextStep || 'Not set'}</p>
              </div>
            </div>
            <p className="dash-sub">{teammateSummary}</p>
            <div className="dash-emma-actions">
              <Link to={`/employees/${activeTeammate.slug}`}>Open workspace</Link>
              <Link to={`/employees/${activeTeammate.slug}`}>Continue setup</Link>
              <Link to={`/employees/${activeTeammate.slug}`}>View latest output</Link>
              <Link to={`/employees/${activeTeammate.slug}`}>Track timeline</Link>
            </div>
          </motion.section>
        )}

        {activeTab === 'home' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>My Teammate</h3>
              <p>Your assigned teammate and current workspace progress</p>
            </div>
            <div className="dash-grid dash-grid--single">
              {activeTeammate ? (
                <motion.article
                  className="dash-card glass-panel"
                  style={{ '--employee-color': activeTeammate.color }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="dash-card-top">
                    <div className="dash-avatar dash-avatar--small" style={{ '--employee-color': activeTeammate.color }}>
                      {activeTeammate.name[0]}
                    </div>
                    <div>
                      <h4>{activeTeammate.name}</h4>
                      <p>{activeTeammate.role}</p>
                    </div>
                  </div>
                  <div className="dash-meta">
                    <div><span>Current stage</span><strong>{teammateStage || 'Not set'}</strong></div>
                    <div><span>Next step</span><strong>{teammateNextStep || 'Not set'}</strong></div>
                  </div>
                  <p className="dash-output">{teammateSummary}</p>
                  <div className="dash-footer">
                    <small>Last login {lastLoginLabel}</small>
                    <Link to={`/employees/${activeTeammate.slug}`}>Open workspace</Link>
                  </div>
                </motion.article>
              ) : (
                <article className="dash-card glass-panel dash-card--placeholder">
                  <h4>No teammate yet</h4>
                  <p>Assign your first teammate to start seeing progress and updates here.</p>
                  <Link className="dash-empty-cta" to="/dashboard/employees">Go to team directory</Link>
                </article>
              )}
            </div>
          </motion.section>
        )}

        {activeTab === 'home' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>Coming Soon</h3>
              <p>More teammates you can add next</p>
            </div>
            <div className="dash-grid dash-grid--recommended">
              {catalogEmployees.slice(0, 4).map((employee) => (
                <motion.article
                  key={employee.slug}
                  className="dash-card dash-card--catalog glass-panel"
                  style={{ '--employee-color': employee.color }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="dash-card-top">
                    <div className="dash-avatar dash-avatar--small" style={{ '--employee-color': employee.color }}>
                      {employee.name[0]}
                    </div>
                    <div>
                      <h4>{employee.name}</h4>
                      <p>{employee.role}</p>
                    </div>
                  </div>
                  <span className="dash-popular">Coming soon</span>
                  <p className="dash-output">{employee.description}</p>
                  <div className="dash-footer">
                    <small>{employee.specialty}</small>
                    <button
                      type="button"
                      className="dash-soon-btn"
                      disabled={Boolean(notifyLoadingBySlug[employee.slug]) || requestedSlugs.has(employee.slug)}
                      onClick={() => handleNotifyMe(employee)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                        <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
                      </svg>
                      <span>
                        {notifyLoadingBySlug[employee.slug]
                          ? 'Saving...'
                          : requestedSlugs.has(employee.slug)
                            ? 'Requested'
                            : 'Notify me'}
                      </span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'employees' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>Team Directory</h3>
              <p>Search by name or job role</p>
            </div>
            <div className="dash-search-wrap glass-panel">
              <input
                type="text"
                className="dash-search-input"
                placeholder="Search by name or role (e.g. Emma, Manager, Analyst)"
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
              />
            </div>
            <div className="dash-grid dash-grid--directory">
              {filteredEmployees.length === 0 && (
                <div className="dash-empty dash-empty--card">
                  <h4>No match found</h4>
                  <p>Try a different name or job keyword.</p>
                </div>
              )}

              {filteredEmployees.map((employee) => {
                const isAssigned = employee.slug === activeTeammateSlug;
                return (
                  <motion.article
                    key={employee.slug}
                    className="dash-card dash-card--catalog glass-panel"
                    style={{ '--employee-color': employee.color }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="dash-card-top">
                      <div className="dash-avatar dash-avatar--small" style={{ '--employee-color': employee.color }}>
                        {employee.name[0]}
                      </div>
                      <div>
                        <h4>{employee.name}</h4>
                        <p>{employee.role}</p>
                      </div>
                    </div>
                    <span className="dash-popular">{isAssigned ? 'Assigned' : 'Coming soon'}</span>
                    <p className="dash-output">{employee.description}</p>
                    <div className="dash-footer">
                      <small>{employee.specialty}</small>
                      {isAssigned ? (
                        <Link to={`/employees/${employee.slug}`}>Open workspace</Link>
                      ) : (
                        <button
                          type="button"
                          className="dash-soon-btn"
                          disabled={Boolean(notifyLoadingBySlug[employee.slug]) || requestedSlugs.has(employee.slug)}
                          onClick={() => handleNotifyMe(employee)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                            <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
                          </svg>
                          <span>
                            {notifyLoadingBySlug[employee.slug]
                              ? 'Saving...'
                              : requestedSlugs.has(employee.slug)
                                ? 'Requested'
                                : 'Notify me'}
                          </span>
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        )}

        {activeTab === 'tasks' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>Tasks</h3>
              <p>Everything waiting, in progress, and completed</p>
            </div>
            <div className="dash-task-list glass-panel">
              {tasks.length === 0 && (
                <div className="dash-empty">
                  <h4>No tasks yet</h4>
                  <p>When tasks are created in your workspace, they will appear here.</p>
                </div>
              )}

              {tasks.map((task) => {
                const state = String(task.status || '').toLowerCase();
                const stateClass = state.includes('done') || state.includes('complete')
                  ? 'dash-task-state--done'
                  : state.includes('progress')
                    ? 'dash-task-state--progress'
                    : 'dash-task-state--todo';

                return (
                  <motion.article
                    key={task.id}
                    className="dash-task-item"
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  >
                    <div>
                      <h4>{task.title || 'Untitled task'}</h4>
                      <p>{task.description || task.summary || 'No description provided.'}</p>
                    </div>
                    <span className={`dash-task-state ${stateClass}`}>{task.status || 'Pending'}</span>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        )}

        {activeTab === 'outputs' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>Recent Outputs</h3>
              <p>Latest deliverables from your workspace</p>
            </div>
            <div className="dash-grid">
              {outputs.length === 0 && (
                <div className="dash-empty dash-empty--card">
                  <h4>No outputs yet</h4>
                  <p>When Emma generates deliverables, they will appear here.</p>
                </div>
              )}

              {outputs.map((output) => (
                <motion.article
                  key={output.id}
                  className="dash-card glass-panel"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <h4>{output.title || 'Untitled output'}</h4>
                  <p className="dash-output">{output.summary || output.description || 'No summary available.'}</p>
                  <div className="dash-footer">
                    <small>Updated {formatDateTime(output.updatedAt || output.createdAt)}</small>
                    <Link to={activeTeammate ? `/employees/${activeTeammate.slug}` : '/dashboard/employees'}>Open</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'profile' && (
          <motion.section className="dash-section" {...fadeUp}>
            <div className="dash-section-head">
              <h3>My Profile</h3>
              <p>Preferences that guide your teammate workflow</p>
            </div>
            <div className="dash-profile-grid">
              <article className="dash-card glass-panel">
                <h4>Basic info</h4>
                <div className="dash-meta">
                  <div><span>Name</span><strong>{nameLabel}</strong></div>
                  <div><span>Email</span><strong>{emailLabel}</strong></div>
                  <div><span>Account created</span><strong>{accountCreatedLabel}</strong></div>
                  <div><span>Last login</span><strong>{lastLoginLabel}</strong></div>
                </div>
              </article>
            </div>
          </motion.section>
        )}

        {error && (
          <section className="dash-section">
            <div className="dash-empty dash-empty--card">
              <h4>Data sync notice</h4>
              <p>{error}</p>
            </div>
          </section>
        )}
      </div>

      <nav className="dash-dock">
        <Link className={activeTab === 'home' ? 'active' : ''} to="/dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" /></svg>
          <span>Home</span>
        </Link>
        <Link className={activeTab === 'employees' ? 'active' : ''} to="/dashboard/employees">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="7" r="2.5" /><path d="M3.5 19a4.5 4.5 0 0 1 9 0" /><path d="M13 18.5a3.5 3.5 0 0 1 7 0" /></svg>
          <span>Employees</span>
        </Link>
        <Link className={activeTab === 'tasks' ? 'active' : ''} to="/dashboard/tasks">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M7.5 10.5h9M7.5 14h5" /></svg>
          <span>Tasks</span>
        </Link>
        <Link className={activeTab === 'outputs' ? 'active' : ''} to="/dashboard/outputs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19h16" /><path d="M7 15V9" /><path d="M12 15V6" /><path d="M17 15v-4" /></svg>
          <span>Outputs</span>
        </Link>
        <Link className={activeTab === 'profile' ? 'active' : ''} to="/dashboard/profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default DashboardPage;
