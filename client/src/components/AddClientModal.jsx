import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQuery';
import { ADD_CLIENT } from '../mutations/clientMutations';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') return alert('Please fill in all fields');

    addClient(name, email, phone);
    clearFields();
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser />
          <div className="m-2">Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={onSubmit} action="" className="d-flex flex-column">
                <div className="mb-3">
                  <label htmlFor="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="align-self-center btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
