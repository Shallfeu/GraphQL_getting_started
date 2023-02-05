import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQuery';
// Components
import Spinner from './../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import EditProjectForm from '../components/EditProjectForm';

export default function Project() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, { variables: { id } });

  const handleDelete = () => {
    deleteProject(id);
    navigate('/');
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="mx-auto w-75 card p-5">
      <Link to="/" className="btn btn-primary btn-sm w-25 d-inline mx-auto mb-3">
        Back
      </Link>

      <h1>{data.project.name}</h1>
      <p>{data.project.descripiton}</p>
      <h5 className="mt-3">Project Status</h5>
      <p className="lead">{data.project.status}</p>

      <ClientInfo client={data.project.client} />

      <div className="mt-3 d-flex justify-content-between">
        <EditProjectForm project={data.project} />

        <button onClick={handleDelete} className="btn btn-danger btn-sm w-25 d-inline">
          Delete
        </button>
      </div>
    </div>
  );
}
