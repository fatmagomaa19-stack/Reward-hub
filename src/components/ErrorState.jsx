import {
  AlertCircle,
  RefreshCw,
} from 'lucide-react'


export default function ErrorState({
  error,
  onRetry,
}) {

  return (
    <div className="error-state">

      <AlertCircle size={22} />

      <div>

        <strong>
          Something went wrong
        </strong>

        <p>
          {error?.message ||
            'Unable to load the data.'}
        </p>

      </div>


      {onRetry && (

        <button
          className="btn btn-light"
          onClick={onRetry}
        >

          <RefreshCw size={16} />

          Retry

        </button>

      )}

    </div>
  )
}