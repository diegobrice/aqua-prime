import { ProgressSpinner } from 'primereact/progressspinner';

const Loader = ({ text }) => {
  return (
    <div className="text-center p-4 pt-6 text-lg">
      <h4>
        <ProgressSpinner
          style={{
            width: '50px',
            height: '50px',
          }}
          strokeWidth="3"
        />
        <p>Cargando...</p>
      </h4>
    </div>
  );
};

export default Loader;
