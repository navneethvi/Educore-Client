// import React from 'react'
import Header from "../components/common/Home/Header";
import FirstRow from "../components/common/Home/FirstRow";
import SecondRow from "../components/common/Home/SecondRow";
import ThirdRow from "../components/common/Home/ThirdRow";
import Footer from "../components/common/Home/Footer";
import FourthRow from "../components/common/Home/FourthRow";

const HomePage = () => {
  return (
    <div>
      <Header />
      <FirstRow />
      <SecondRow />
      <ThirdRow />
      <FourthRow />
      <Footer />
    </div>
  );
};

export default HomePage;
