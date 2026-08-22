import { AnimatePresence, motion } from 'framer-motion'

export default function ConfirmDeleteModal({ open, title = 'Delete this item?', message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full"
          >
            <h3 className="font-serif text-lg text-textMain mb-2">{title}</h3>
            <p className="text-sm text-textSecondary mb-6">
              {message || 'This action cannot be undone. Are you sure you want to proceed?'}
            </p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onCancel} className="btn-secondary !py-2 !px-5 text-xs">
                Cancel
              </button>
              <button type="button" onClick={onConfirm} className="admin-btn-danger">
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
