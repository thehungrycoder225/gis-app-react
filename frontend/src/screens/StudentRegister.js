import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAreas } from '../actions/areaActions';
import { register } from '../actions/studentActions';

const StudentRegister = ({ location, history }) => {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const [studentId, setStudentId] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setStudentAddress] = useState('');
  const studentRegister = useSelector((state) => state.studentRegister);
  const { loading, error, studentInfo } = studentRegister;
  const [message, setMessage] = useState(null);
  const areaList = useSelector((state) => state.areaList);
  const { areas } = areaList;

  const ChangeMunicipality = async (e) => {
    e.preventDefault();
    await setMunicipality(e.target.value);
  };

  const ChangeBarangay = async (e) => {
    e.preventDefault();
    await setBarangay(e.target.value);
  };

  useEffect(() => {
    dispatch(listAreas(municipality));
    setStudentAddress(`${barangay},${municipality},Marinduque`);
  }, [dispatch, history, municipality, barangay, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register());
    setMessage('Registration Successful');
  };

  return <></>;
};

export default StudentRegister;
