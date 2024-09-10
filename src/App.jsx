import { useState } from 'react';
import './App.css';
import 'remixicon/fonts/remixicon.css'

function App() {

  const [right, setRight] = useState(-450)

  const [form, setForm] = useState({
    name: '',
    class: '',
    roll: '',
    subject: '',
    dob: '',
  })

  const [student, setStudent] = useState([])

  const [editIndex, setEditIndex] = useState(null)

  const handleDrawer = () => {
    setRight(0)
  }

  const handleInput = (e) => {
    const input = e.target
    const value = input.value
    const key = input.name
    setForm({
      ...form,
      [key]: value,

    })
  }

  const createStudent = (e) => {
    e.preventDefault()
    setStudent([
      ...student,
      form
    ])
    setForm({
      name: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    })
    setRight(-450)
  }

  const deleteStudent = (index) => {
    const backup = [...student]
    backup.splice(index, 1)
    setStudent(backup)
  }

  const editStudent = (index) => {
    setRight(0)
    setForm(student[index])
    setEditIndex(index)
  }

  const saveStudent = (e) => {
    e.preventDefault()
    const backup = [...student]
    backup[editIndex] = form
    setStudent(backup)
    setForm({
      name: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    })
    setEditIndex(null)
    setRight(-450)
  }

  const closeDrawer = () => {
    setRight(-450)
    setForm({
      name: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    })
    setEditIndex(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#dbeafe'
    }}>

      <div style={{
        width: '70%',
        margin: '0 auto',
        padding: 22,
      }}>
        <h1 style={{
          textAlign: 'center'
        }}>React CRUD App</h1>

        <button
          onClick={handleDrawer}
          style={{
            border: 'none',
            padding: '10px 20px',
            borderRadius: 5,
            background: 'dodgerblue',
            color: 'white',
            margin: 20
          }}
        >
          <i className="ri-user-add-line" style={{
            marginRight: 8,
          }}></i>
          New Student
        </button>

        <table className='curd-app'>
          <thead>
            <tr>
              <th>S/No</th>
              <th>Student's name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Roll</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              student.map((items, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{items.name}</td>
                    <td>{items.subject}</td>
                    <td>{items.class}</td>
                    <td>{items.roll}</td>
                    <td>{items.dob}</td>
                    <td>
                      <div>
                        <button 
                          onClick={()=>{editStudent(index)}}
                          style={{
                            border: 'none',
                            background: 'white',
                            fontSize: 18,
                            marginRight: 18,
                            backgroundColor: 'green',
                            color: 'white',
                            padding: 5,
                            borderRadius: 5
                          }}
                        >
                          <i className="ri-edit-2-line"></i>
                        </button>

                        <button
                          onClick={()=>{deleteStudent(index)}}
                          style={{
                              border: 'none',
                              background: 'white',
                              fontSize: 18,
                              backgroundColor: 'red',
                              color: 'white',
                              padding: 5,
                              borderRadius: 5
                            }}
                          >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <aside style={{
        position: 'fixed',
        top: 0,
        right: right,
        width: 450,
        height: '100%',
        padding: 22,
        background: 'white',
        boxShadow: '0 0 40px rgba(0,0,0,0.3)',
        transition: '0.3s'
      }}>
        <button
          onClick={closeDrawer}
          style={{
            border: 'none',
            background: 'white',
            fontSize: 25,
            position: 'absolute',
            top: 22,
            right: 22
          }}
        >
          <i style={{
            color: 'dodgerblue'
          }} className="ri-close-circle-line"></i>
        </button>

        <h1>New Student</h1>
        <form action=""
          onSubmit={editIndex === null ? createStudent : saveStudent}
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          <input
            value={form.name}
            onChange={handleInput}
            required
            type="text"
            name="name"
            placeholder='Enter your name here'
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5
            }}
          />
          <input
            value={form.class}
            onChange={handleInput}
            required
            type="number"
            name="class"
            placeholder='Enter your Class here'
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5
            }}
          />
          <input
            value={form.roll}
            onChange={handleInput}
            required
            type="number"
            name="roll"
            placeholder='Enter your Roll no here'
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5
            }}
          />
          <input
            value={form.subject}
            onChange={handleInput}
            required
            type="text"
            name="subject"
            placeholder='Enter your Subject no here'
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5
            }}
          />
          <input
            value={form.dob}
            onChange={handleInput}
            required
            type="date"
            name="dob"

            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 5
            }}
          />

            {
              editIndex === null ? 
              <button
                  style={{
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 5,
                    background: 'dodgerblue',
                    color: 'white',
                    // width: 'fit-content'
                  }}
                >Submit
              </button> 
            :
            <button
              style={{
                border: 'none',
                padding: '10px 20px',
                borderRadius: 5,
                background: 'dodgerblue',
                color: 'white',
                // width: 'fit-content'
              }}>Save
            </button>
          }
        </form>
      </aside>
    </div>
  );
}

export default App;
