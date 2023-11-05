import React, { useState } from 'react';
import { Box, Button, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BasicTable from './BasicTable';

function boothmultiplication(Multiplicand, Multiplier) {
  let M = '0' + DecimalToBinary(parseInt(Multiplicand));
  let Q = DecimalToBinary(parseInt(Multiplier));
  let Q1 = '0';
  let N = M.length;
  let A = '0'.repeat(N);
  Q = '0'.repeat(N-Q.length) + Q;
  let Arr = [];
  Arr.push({ Step:0, A, Q, Q1, M, Reason: 'Intialization' })

  for (let i = 0; i < N; i++) {
    const lastBitQ = Q.substring(Q.length - 1);
    let Reason = 'Right Shift';

    if (lastBitQ === '1' && Q1 === '0') {
        const M_ = twosComplement(M);
        A = binaryAddition(A, M_);
        Reason =  'A = A - M';
    } else if (lastBitQ === '0' && Q1 === '1') {
      A = binaryAddition(A, M);
      Reason =  'A = A + M';
    }

    if(A.length>Q.length) {A = A.substring(A.length-Q.length,A.length);}
    else if(A.length<Q.length){A = '0'.repeat(Q.length-A.length) + A}

    // Perform right shift
    const FBitA = A[0]; const LBitA = A[A.length - 1]; const LBitQ = Q[Q.length - 1];
    A = FBitA + A.substring(0, A.length - 1);
    Q = LBitA + Q.substring(0, Q.length - 1);
    Q1 = LBitQ;

    const Step = i + 1;
    Arr.push({ Step, A, Q, Q1, M, Reason: Reason });
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
    if(M.length>res.length){
      res = '0'.repeat(M.length-res.length) + res;
    }
    console.log(res);
    return res;
    
}

function binaryAddition(s1, s2) {
    const M = Math.max(s1.length,s2.length);
    var num1 = parseInt(s1, 2);
    var num2 = parseInt(s2, 2);
    var sum = num1 + num2;
    var binarySum = sum.toString(2);
    if(M > binarySum.length){
      binarySum = '0'.repeat(M-binarySum.length) + binarySum;
    }
    return  binarySum;
  }
  
function BoothMultiplication() {
  const Heading = ['Step','A','Q','Q1','M','Reason'];
  const [Multiplicand, setMultiplicand] = useState('');
  const [Multiplier , setMultiplier ] = useState('');
  const [Calculate, SetCalulate] = useState(false);
  let [Content,setContent] = useState([]);

  const handleMultiplicandChange = (event) => {
    setMultiplicand(event.target.value);
  };

  const handleMultiplierChange = (event) => {
    setMultiplier (event.target.value);
  };

  const handleSubmit = () => {
    if(Multiplicand === '' || Multiplier ==='' ){
      alert('Invalid Input');
    }else if(parseInt(Multiplicand) < parseInt(Multiplier) ){
      alert('Multiplicand Should be greater than Multiplier');
    }else{
      setContent([]);
      SetCalulate(true);
      const arr = boothmultiplication(Multiplicand,Multiplier)
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
        value={Multiplicand}
        onChange={handleMultiplicandChange}
        sx={{
          backgroundColor: 'white',
          border: '2px solid #ffffff',
          borderRadius: '5px'
        }}
        placeholder="Multiplicand"
      />
      <CloseIcon
        sx={{
          backgroundColor: 'white',
          border: '2px solid #ffffff',
          borderRadius: '50%'
        }}
       />
      <Input
        value={Multiplier }
        onChange={handleMultiplierChange}
        sx={{
          backgroundColor: 'white',
          border: '2px solid #ffffff',
          borderRadius: '5px'
        }}
        placeholder="Multiplier "
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
  );
}

export default BoothMultiplication;
