import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const FadeInUpWrapper = ({ children }: { children: ReactNode }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default FadeInUpWrapper;
