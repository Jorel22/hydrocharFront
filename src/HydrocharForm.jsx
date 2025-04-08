// src/HydrocharForm.js
import React, { useState } from 'react';
import axios from 'axios';
import process from './interface.png' 
import './custom.css'
const HydrocharForm = () => {
    const [formData, setFormData] = useState({
        carbon: '',
        hydrogen: '',
        nitrogen: '',
        moisture: '',
        ash: '',
        rv: '',
        rt: '',
        temperature: '',
        bwRatio: '',
      });

    const [predictedValues, setPredictedValues] = useState([null,null,null,null,null,null,null,null])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        "input": [
            parseFloat(formData.carbon),
            parseFloat(formData.hydrogen),
            parseFloat(formData.nitrogen),
            parseFloat(formData.moisture),
            parseFloat(formData.ash),
            parseFloat(formData.rv),
            parseFloat(formData.rt),
            parseFloat(formData.temperature),
            parseFloat(formData.bwRatio),
        ]
    };
    try {
      const response = await axios.post('https://bqs4t1e34m.execute-api.us-east-1.amazonaws.com/predict', data);
      setPredictedValues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setFormData({
      carbon: '',
      hydrogen: '',
      nitrogen: '',
      moisture: '',
      ash: '',
      rv: '',
      rt: '',
      temperature: '',
      bwRatio: '',
    });
    setPredictedValues({
      C_h: null,
      H_h: null,
      N_h: null,
      O_h: null,
      VM_h: null,
      FC_h: null,
      Ash_h: null,
      Yield_h: null,
    });
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  return (
    <> 
    <h1>Hydrochar Prediction App</h1>
    <img src={process} height={300} alt="Process" />
    <br />
    <br />

    <form onSubmit={handleSubmit}>
      <div class="parent">
          <div class="div1">
              <h3>Biomass values</h3>
            <label >
              C (%):  
              <input className='input-margin' type="number" step="0.01" name="carbon" value={formData.carbon} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              H (%):
              <input className='input-margin' type="number" step="0.01" name="hydrogen" value={formData.hydrogen} onChange={handleChange} required />
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              N (%):
              <input className='input-margin' type="number" step="0.01" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required />
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              M (%):
              <input className='input-margin' type="number" step="0.01" name="moisture" value={formData.moisture} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              Ash (%):
              <input className='input-margin' type="number" step="0.01" name="ash" value={formData.ash} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            
          </div>
          <div class="div2">
              <h3>Operational values</h3>
            <label>
              RV (ml): 
              <input className='input-margin' type="number" step="0.01" name="rv" value={formData.rv} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              RT (min): 
              <input className='input-margin' type="number" step="0.01" name="rt" value={formData.rt} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              T (°C):
              <input className='input-margin' type="number" step="0.01" name="temperature" value={formData.temperature} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
            <br />
            <label>
              B/W ratio (1/100):
              <input className='input-margin' type="number" step="0.01" name="bwRatio" value={formData.bwRatio} onChange={handleChange} required/>
            </label>
            <label className='required'>*</label>
          </div>
          <div class="div3">
            <br />
            <br />
            <br />
            <button type="submit">Predict</button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <button type="button" onClick={handleRefresh}>Refresh</button>
          </div>
          <div class="div4">
            <h3>Hydrochar Predicted Value</h3>
            <p>C_h: {predictedValues[0] !== null ? formatNumber(predictedValues[0]) : null}</p>
            <p>H_h: {predictedValues[1] !== null ? formatNumber(predictedValues[1]) : null}</p>
            <p>N_h: {predictedValues[2] !== null ? formatNumber(predictedValues[2]) : null}</p>
            <p>O_h: {predictedValues[3] !== null ? formatNumber(predictedValues[3]) : null}</p>
            <p>VM_h: {predictedValues[4] !== null ? formatNumber(predictedValues[4]) : null}</p>
            <p>FC_h: {predictedValues[5] !== null ? formatNumber(predictedValues[5]) : null}</p>
            <p>Ash_h: {predictedValues[6] !== null ? formatNumber(predictedValues[6]) : null}</p>
            <p>Yield_h: {predictedValues[7] !== null ? formatNumber(predictedValues[7]) : null}</p>
          </div>
        <div>
          <p class="psmall">Note: Make sure data meets following requirements: </p>
          <p className="psmall">C + H + N + O + Ash = 100%</p>
          <p className="psmall">VM + FC + Ash = 100%</p>
        </div>
      </div>
        <br />
        
    </form>

    <br />
    <footer className="footer">
      <hr className='hrthin'/>
      <p>Copyright © {new Date().getFullYear()} Darwin Ortiz</p>
    </footer>
    </>
  );
};

export default HydrocharForm;
