import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEmployeeBySlug } from '../data/employees';
import Navbar from '../components/Navbar';
import './EmployeeProfile.css';

const EmployeeProfilePage = () => {
  const { slug } = useParams();
  const employee = getEmployeeBySlug(slug);

  if (!employee) {
    return (
      <div className="employee-page">
        <Navbar />
        <div className="employee-shell employee-shell--not-found">
          <h1>Profile not found</h1>
          <p>This employee profile is not available right now.</p>
          <Link className="employee-back-btn" to="/#workers">Back to team</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-page">
      <Navbar />
      <div className="employee-bg-grid" />
      <motion.div
        className="employee-shell"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="employee-header">
          <Link className="employee-back-btn" to="/#workers">Back to team</Link>
          <div className="employee-headline">
            <div className="employee-avatar" style={{ '--employee-color': employee.color }}>
              {employee.name[0]}
            </div>
            <div>
              <p className="employee-label">{employee.specialty}</p>
              <h1>{employee.name}</h1>
              <p className="employee-role">{employee.role}</p>
              <p className="employee-intro">{employee.description}</p>
            </div>
          </div>
        </header>

        <section className="employee-content-grid">
          <article className="employee-content-col">
            <div className="employee-block">
              <h2>What this employee will do</h2>
              <ul>
                {employee.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="employee-block">
              <h2>Why this employee and not someone else</h2>
              <ul>
                {employee.whyThisEmployee.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="employee-block">
              <h2>Expected outcomes</h2>
              <ul>
                {employee.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="employee-price-card" style={{ '--employee-color': employee.color }}>
            <p className="price-chip">Early Member Offer</p>
            <h3>Everything is free right now</h3>
            <p className="price-main">$0</p>
            <p className="price-sub">Early members get full access with no cost while we scale.</p>

            <div className="price-features">
              <div>Full role workflow setup</div>
              <div>Unlimited task delegation</div>
              <div>Priority onboarding support</div>
              <div>Weekly performance updates</div>
            </div>

            <Link className="price-cta" to="/signup">
              Hire {employee.name}
            </Link>
            <p className="price-note">No payment needed for early access.</p>
          </aside>
        </section>
      </motion.div>
    </div>
  );
};

export default EmployeeProfilePage;
