import React from 'react';
import '../../assets/styles/Glav.css';
import SearchInput from '../components/Form/SearchInput';
import Slider from '../components/Slider';
import MobileSearch from '../components/Form/MobileSearch';

function Glav() {
  return (
    <>
    <div className="container">
      <MobileSearch />
      <Slider />
    </div>
    </>
    )
}
export default Glav;