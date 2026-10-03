import { motion } from 'framer-motion'


export default function StatCard({
  icon,
  label,
  value,
  helper,
  accent = 'red',
}) {

  return (
    <motion.div

      className={`stat-card accent-${accent}`}

      initial={{
        opacity: 0,
        y: 12,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.25,
      }}

    >

      <div className="stat-icon">
        {icon}
      </div>


      <div className="stat-content">

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

        {helper && (
          <small>
            {helper}
          </small>
        )}

      </div>

    </motion.div>
  )
}