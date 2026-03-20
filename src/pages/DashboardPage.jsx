import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { employees } from '../data/employees';
import { auth } from '../lib/firebase';
import './Dashboard.css';

const employeeRuntime = {
  emma: {
    status: 'Waiting on you',
    process: 'Admissions intake',
    latestOutput: 'University shortlist draft ready for review.',
    lastActive: '2m ago',
  },
};

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

const DashboardPage = () => {
  const [firstName, setFirstName] = useState('there');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirstName(user ? getFirstName(user) : 'there');
    });
    return () => unsubscribe();
  }, []);

  const emma = useMemo(() => employees.find((employee) => employee.slug === 'emma'), []);
  const myEmployees = useMemo(() => employees.filter((employee) => ['emma'].includes(employee.slug)), []);
  const recommendedEmployees = useMemo(
    () => employees.filter((employee) => ['noah', 'ava', 'ethan', 'sofia'].includes(employee.slug)),
    []
  );
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="dashboard-page">
      <Link className="dash-home-logo" to="/">
        <img src="/logo_nobg.png" alt="Veda logo" />
        <span>VEDA</span>
      </Link>

      <div className="dashboard-shell">
        <section className="dash-hero glass-panel">
          <div className="dash-hero-left">
            <div>
              <p className="dash-label">Your Workspace</p>
              <h1>Welcome back, {firstName}</h1>
              <p className="dash-sub">
                Emma is live and ready. Start your admission workflow, review progress, and keep every step moving.
              </p>
            </div>
            <div className="dash-hero-status">
              <div className="dash-status-chip">Launching now: Emma</div>
              <div className="dash-status-chip">More teammates: Coming soon</div>
              <div className="dash-status-chip">Today: {todayLabel}</div>
            </div>
          </div>

          <div className="dash-hero-right">
            <p className="dash-brand">Live Right Now</p>
            <p className="dash-right-text">
              Emma helps you shortlist universities, shape your SOP, and stay on track with deadlines.
            </p>
            <Link className="dash-hero-cta" to="/employees/emma">Try Emma</Link>
          </div>
        </section>

        {emma && (
          <section className="dash-emma glass-panel">
            <div className="dash-emma-head">
              <div className="dash-avatar" style={{ '--employee-color': emma.color }}>{emma.name[0]}</div>
              <div>
                <p className="dash-label">Featured Teammate</p>
                <h2>Emma</h2>
                <p className="dash-emma-role">{emma.role}</p>
                <p className="dash-emma-status">{employeeRuntime.emma.status} • {employeeRuntime.emma.process}</p>
              </div>
            </div>
            <div className="dash-emma-actions">
              <Link to="/employees/emma">Start session</Link>
              <Link to="/employees/emma">Continue profile intake</Link>
              <Link to="/employees/emma">View shortlist</Link>
              <Link to="/employees/emma">Track applications</Link>
            </div>
          </section>
        )}

        <section className="dash-section">
          <div className="dash-section-head">
            <h3>My Teammate</h3>
            <p>What Emma is working on right now</p>
          </div>
          <div className="dash-grid">
            {myEmployees.map((employee) => {
              const runtime = employeeRuntime[employee.slug];
              return (
                <article key={employee.slug} className="dash-card glass-panel" style={{ '--employee-color': employee.color }}>
                  <div className="dash-card-top">
                    <div className="dash-avatar dash-avatar--small" style={{ '--employee-color': employee.color }}>
                      {employee.name[0]}
                    </div>
                    <div>
                      <h4>{employee.name}</h4>
                      <p>{employee.role}</p>
                    </div>
                  </div>
                  <div className="dash-meta">
                    <div><span>Status</span><strong>{runtime?.status || 'Available'}</strong></div>
                    <div><span>Current Process</span><strong>{runtime?.process || 'Idle'}</strong></div>
                  </div>
                  <p className="dash-output">{runtime?.latestOutput || 'No recent output yet.'}</p>
                  <div className="dash-footer">
                    <small>Last active {runtime?.lastActive || 'just now'}</small>
                    <Link to={`/employees/${employee.slug}`}>Open workspace</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="dash-section">
          <div className="dash-section-head">
            <h3>Coming Soon</h3>
            <p>More teammates you can add next</p>
          </div>
          <div className="dash-grid dash-grid--recommended">
            {recommendedEmployees.slice(0, 4).map((employee) => (
              <article key={employee.slug} className="dash-card glass-panel" style={{ '--employee-color': employee.color }}>
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
                  <span className="dash-soon-btn">Notify me</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <nav className="dash-dock">
        <button className="active" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" /></svg>
          <span>Home</span>
        </button>
        <button type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="7" r="2.5" /><path d="M3.5 19a4.5 4.5 0 0 1 9 0" /><path d="M13 18.5a3.5 3.5 0 0 1 7 0" /></svg>
          <span>Employees</span>
        </button>
        <button type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M7.5 10.5h9M7.5 14h5" /></svg>
          <span>Tasks</span>
        </button>
        <button type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19h16" /><path d="M7 15V9" /><path d="M12 15V6" /><path d="M17 15v-4" /></svg>
          <span>Outputs</span>
        </button>
        <button type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardPage;
