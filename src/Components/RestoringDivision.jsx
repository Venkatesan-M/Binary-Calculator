import React, { useState } from 'react';
import { Box, Button, Input } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import BasicTable from './BasicTable';

function restoringdivision(Dividend,Divisor){
  let M =  DecimalToBinary(parseInt(Divisor));
  let Q = DecimalToBinary(parseInt(Dividend));
  let N = Q.length;
  let A = '0'.repeat(N+1);
  M = '0'.repeat(N+1-M.length) + M;
  let Arr = [];
  Arr.push({ Step:0, A, Q, M, Reason: 'Intialization' });
  for (let i = 0; i < N; i++){
    let Reason = 'left Shift';
    const FBitQ = Q[0];
    A = A.substring(1,A.length) + FBitQ;
    Q = Q.substring(1,Q.length);
    const M_ = twosComplement(M);
    A = binaryAddition(A, M_);
    A = A.substring(A.length-M.length,A.length); 
    if(A[0]==='1'){
      Q+='0';
      A = binaryAddition(A, M);
      A = A.substring(A.length-M.length,A.length);
      Reason = 'Restored';
    }else{
      Q+='1';
      Reason = 'Not Restored';
    }  
    const Step = i + 1;
    Arr.push({ Step, A, Q, M, Reason: Reason });
  }
  return Arr;
}

function DecimalToBinary(N) {
  var res = '';
  while (N !== 0) {
    res = (N % 2) + res;
    N = Math.floor(N / 2);
  }
  return res;
}

function twosComplement(M){
  let res = '';
  for(let i = 0; i < M.length; i++){
      (M[i]==='0') ? res+='1' : res+='0';
  }
  res = binaryAddition(res,'1');
  return res;
  
}

function binaryAddition(s1, s2) {
  var num1 = parseInt(s1, 2);
  var num2 = parseInt(s2, 2);
  var sum = num1 + num2;
  var binarySum = sum.toString(2);
  return  binarySum;
}

function RestoringDivision() {
    const Heading = ['Step','A','Q','M','Reason'];
    const [Dividend, setDividend] = useState('');
    const [Divisor , setDivisor ] = useState('');
    const [Calculate, SetCalulate] = useState(false);
    let [Content,setContent] = useState([]);
  
    const handleDividendChange = (event) => {
      setDividend(event.target.value);
    };
  
    const handleDivisorChange = (event) => {
      setDivisor (event.target.value);
    };
  
    const handleSubmit = () => {
      if(Dividend === '' || Divisor ==='' ){
        alert('Invalid Input');
      }else if(parseInt(Dividend) < parseInt(Divisor) ){
        alert('Dividend Should be greater than Divisor');
      }else{
        setContent([]);
        SetCalulate(true);
        const arr = restoringdivision(Dividend,Divisor);
        setContent(arr);
      }
    };
  return (
    <>
    <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-evenly', // Center horizontally
      gap: 2,
    }}
  >
    <Input
      value={Dividend}
      onChange={handleDividendChange}
      sx={{
        backgroundColor: 'white',
        border: '2px solid #ffffff',
        borderRadius: '5px'
      }}
      placeholder="Dividend"
    />
    <PercentIcon
      sx={{
        backgroundColor: 'white',
        border: '2px solid #ffffff',
        borderRadius: '50%'
      }}
     />
    <Input
      value={Divisor }
      onChange={handleDivisorChange}
      sx={{
        backgroundColor: 'white',
        border: '2px solid #ffffff',
        borderRadius: '5px'
      }}
      placeholder="Divisor "
    />
    <Button onClick={handleSubmit} variant="contained" color="secondary">
      Calculate
    </Button>
  </Box>
  <Box
      sx={{
        marginTop: '25px',
        display: 'flex',
      }}
    >
    
    {Calculate && <BasicTable Heading={Heading} Content={Content} /> }
    </Box>
  </>
  )
}

export default RestoringDivision