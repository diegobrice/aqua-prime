import { Divider } from 'primereact/divider';

const Title = ({ text }) => {
  return (
    <div className="text-center p-4 pt-6 text-lg">
      <h2>
        <i className="pi pi-user mr-2"></i>
        {text}
      </h2>
      {/* <Divider /> */}
    </div>
  );
};

export default Title;
