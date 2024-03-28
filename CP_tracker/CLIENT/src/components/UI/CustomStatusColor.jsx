const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-500 text-white';
      case 'Attempted':
        return 'bg-blue-500 text-white';
      case 'Revisit':
        return 'bg-cyan-500 text-black'; 
      default:
        return 'bg-gray-500 text-white'; 
    }
  };

  export default getStatusColor;