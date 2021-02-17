import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {
  Card,
  Table,
  Tab,
  Tabs,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [contactList, setContactList] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [individual, setIndividual] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/get').then((response) => {
      setContactList(response.data);
    })
  }, []);

  /**
   * Create a contact - form submit
  */
  const formSubmit = () => {
    axios.post('http://127.0.0.1:3001/api/insert', 
      {
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        telNumber: telNumber
      })

      setContactList([...contactList, {
        first_name: firstName, 
        last_name: lastName, 
        email: email, 
        tel_number: telNumber
      }]);      
  }

  /**
   * Delete a contact
   * @param id 
   */
  const deleteContact = (id) => {
    axios.delete(`http://127.0.0.1:3001/api/delete/${id}`);
  }

  /**
   * Open individual contact modal
   * @param id 
  */
  const contactModal = (id) => {
    axios.get(`http://127.0.0.1:3001/api/get-contact/${id}`).then((response) => {
      const data = response.data;
      for (var i = 0; i < data.length; i++) {
        setFirstName(data[i].first_name);
        setLastName(data[i].last_name);
        setEmail(data[i].email);
        setTelNumber(data[i].tel_number);
      }
      setIndividual(response.data);
    }, []);
    setUpdateModal(true);
    console.log('FN: ', firstName);
  }  

  /**
   * Update contact details
   * @param id 
  */
  const updateContact = (id) => {
    axios.post(`http://127.0.0.1:3001/api/update/${id}`, 
    {
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        telNumber: telNumber
    });
  }

  /**
   * Custom Cog toggle for table Actions
  */
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className="custom-cog-toggle"
    >
      &#x2699;
      {children}
    </a>
  ));
  
  return (
    <div className="App container">
      <Modal
        show={updateModal}
        onHide={() => setUpdateModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {individual.map((val, index) => {
            return (
              <Form key={index + 1}>
                <Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="first_name" placeholder={val.first_name} onChange={(e) => {setFirstName(e.target.value)}} />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="last_name" placeholder={val.last_name} onChange={(e) => {setLastName(e.target.value)}} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder={val.email} onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Group> 
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="tel_number" placeholder={val.tel_number} onChange={(e) => {setTelNumber(e.target.value)}} />
                </Form.Group>    
                <Form.Group>
                  <Button variant="primary" onClick={() => {updateContact(val.id)}}>
                    Submit
                  </Button>
                </Form.Group>                
              </Form>
            );
          })}
        </Modal.Body>
      </Modal>
      <h1>React &#38; Nodejs Contacts Application (CRUD)</h1>
      <Card>
        <Card.Header>
          
        </Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="contactList">
            <Tab eventKey="contactList" title="Contacts" className="tab-content">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {contactList.map((val, index) => {
                  return (
                    <tbody key={index + 1}>
                      <tr>
                        <td className="align-middle">{val.first_name}</td>
                        <td className="align-middle">{val.last_name}</td>
                        <td className="align-middle">{val.email}</td>
                        <td className="align-middle">{val.tel_number}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Button variant="danger" onClick={() => {deleteContact(val.id)}}>Delete</Button>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Button variant="primary" onClick={() => {contactModal(val.id)}}>Update</Button>
                              </Dropdown.Item>                              
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}                    
              </Table>
            </Tab>
            <Tab eventKey="contactForm" title="Create Contact" className="tab-content">
              <Form>
                <Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="first_name" onChange={(e) => {setFirstName(e.target.value)}} />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="last_name" onChange={(e) => {setLastName(e.target.value)}} />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Group> 
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="tel_number" onChange={(e) => {setTelNumber(e.target.value)}} />
                </Form.Group>    
                <Form.Group>
                  <Button variant="primary" onClick={formSubmit}>
                    Submit
                  </Button>
                </Form.Group>                                           
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
