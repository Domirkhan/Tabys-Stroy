import React from 'react';
import { Radio } from 'antd';
import { Prices } from '../../assets/components/Prices';

const PriceFilter = ({ setRadio }) => {
  return (
    <div className="price-filter">
      <h4 className="text-center mt-4">Фильтр по цене</h4>
      <div className="d-flex flex-column">
        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
          {Prices?.map((p) => (
            <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div className="d-flex flex-column mt-3">
        <button
          className="btn btn-danger"
          onClick={() => window.location.reload()}
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;