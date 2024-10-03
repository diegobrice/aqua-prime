import { Tag } from '@/utils/primeComponents';

const ClientCard = ({ client }) => {
  const {
    name,
    clientCategory,
    address,
    addressTwo,
    phoneNumber,
    additionalPhoneNumber,
  } = client;

  const renderAddress = (address) => (
    <p className="text-gray-400">
      <i className="pi pi-map-marker mr-2"></i>
      {address}
    </p>
  );

  const renderPhoneNumber = (phoneNumber) => (
    <p className="text-gray-400">
      <i className="pi pi-phone mr-2"></i>
      {phoneNumber}
    </p>
  );
  return (
    <div className="p-3 border rounded-lg shadow border-gray-700">
      <div className='flex justify-between items-center'>
        <h5 className="mb-1 text-xl font-bold">{name}</h5>
        {clientCategory && (
          <Tag
            severity="success"
            value={clientCategory}
            rounded
            className="min-w-24"
          />
        )}
      </div>
      {address && renderAddress(address)}
      {addressTwo && renderAddress(addressTwo)}
      {phoneNumber && renderPhoneNumber(phoneNumber)}
      {additionalPhoneNumber && renderPhoneNumber(additionalPhoneNumber)}
    </div>
  );
};

export default ClientCard;
