import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      style={{
        background: visible
          ? useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, var(--blue-500), transparent 80%)`
          : useMotionTemplate`radial-gradient(0px circle at ${mouseX}px ${mouseY}px, var(--blue-500), transparent 80%)`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            'dark:placeholder-text-neutral-600 duration-400 flex h-10 w-full rounded-md border-none bg-[#eeeeee] px-3 py-2 text-lg text-black shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </motion.div>
  );
});

export default Input;
