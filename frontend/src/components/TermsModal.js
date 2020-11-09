import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import logo from '../extras/Logo2.svg';
const TermsModal = ({ show }) => {
  return (
    <Modal size='lg' show={show} onHide={show} aria-labelledby='terms-modal'>
      <Modal.Header closeButton>
        <Modal.Title id='terms-modal' className='m-auto'>
          <img src={logo} alt='Brand Logo' className='d-inline-block  m-auto' />
          <h1 className='text-primary d-inline-block mx-5'>
            Data <span className='text-warning'>Privacy Statement</span>
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-5 text-justify'>
        <p>
          The information collected and stored shall be used exclusively for the
          purpose of Geospatial Mapping of MCS employees and students, MSC’s
          initiative to help in the government’s effort to control the spread of
          COVID-19.
        </p>
        <p>
          Upon submission of the form, this application will automatically
          collect the geographic coordinates of your current location. Your
          personal data together with the geospatial data shall be sent
          automatically to a server were your information will be processed and
          pinned to a map. After submission of the form, you will be
          disconnected to the system and the system has no capability to track
          your location.
        </p>
        <p>
          You will see your information in the map if you will access the Public
          View of the map, while other users will not be able to see your data.
          MSC is duty-bound to protect such information as prescribed under{' '}
          <a
            href='https://bit.ly/36iCCpt'
            target='_blank'
            rel='noreferrer'
            className='font-weight-bold text-decoration-none text-warning'
          >
            {' '}
            Republic Act 10173{' '}
          </a>{' '}
          or the National Privacy Act of 2012 without the expressed written
          consent of the users concerned. Click I Agee button if you agree and
          allow MSC to include you in the map. Thank you.
        </p>
        <Button onClick={() => show}>I Agree</Button>
      </Modal.Body>
    </Modal>
  );
};

export default TermsModal;
