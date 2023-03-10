// Components
import Spinner from './Spinner';
import ProjectCard from './ProjectCard';
// Utils
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQuery';

export default function Projects() {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
