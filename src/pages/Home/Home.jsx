// Home.jsx
import { motion } from 'framer-motion';
import Banner from './Banner';
import LatestJobs from './LatestJobs';
import Categories from './Categories';
import About from './About';
import HowWork from './HowWork';

import WhyChooseUs from './WhyChooseUs';
import PlatformStats from './PlatformStats';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <Banner />
      <LatestJobs />
      <Categories />

      <PlatformStats />
      <WhyChooseUs />
      <About />
      <HowWork />
    </motion.div>
  );
};

export default Home;
