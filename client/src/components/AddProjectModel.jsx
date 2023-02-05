import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQuery';
import { GET_CLIENTS } from '../queries/clientQuery';
import { statusEnum } from '../App';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  // Get clients for select
  const { data, loading, error } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || clientId === '' || status === '')
      return alert('Please fill in all fields');

    addProject(name, description, clientId, status);
    clearFields();
  };

  const clearFields = () => {
    setName('');
    setDescription('');
    setClientId('');
  };

  if (loading) return null;
  if (error) return <>Something went wrong</>;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList />
          <div className="m-2">Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">
                Add Project
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
                  <label htmlFor="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="form-label">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {Object.entries(statusEnum).map(([value, status]) => (
                      <option key={value} value={value}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="form-label">Client ID</label>
                  <select
                    id="status"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option key="1234" value="" disabled>
                      Select Client
                    </option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="align-self-center btn btn-primary"
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
