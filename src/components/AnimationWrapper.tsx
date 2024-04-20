'use client';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimationWrapperProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  transition?: { [key: string]: any };
  keyValue: string | number;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  keyValue,
  className,
}: AnimationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div initial={initial} animate={animate} transition={transition} key={keyValue} className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
