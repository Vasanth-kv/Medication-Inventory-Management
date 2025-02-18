import React from 'react';


const StaticAdvertisement = ({ adContent }) => (
  <div style={{
    backgroundColor: 'transparent',
    color: 'black',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    margin: '10px', // Added margin for spacing between ads
    minHeight: '50px',
    textAlign: 'center',
    flex: '1', // Ensure ads take equal space
    maxWidth: '100%', // Ensure the ad fits within the column
  }}>
    <img src={adContent.imageSrc} alt="Advertisement" style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
    <div>{adContent.text}</div>
  </div>
);

export default StaticAdvertisement;

// const RotatingAdvertisement = ({ ads }) => {
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
//     }, 5000); // Change ad every 5 seconds

//     return () => clearInterval(interval);
//   }, [ads.length]);

//   const { imageSrc, text } = ads[currentAdIndex];

//   return (
//     <div style={{
//       backgroundColor: '#007bff',
//       color: 'white',
//       padding: '20px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: '8px',
//       marginTop: '20px',
//       minHeight: '200px',
//       textAlign: 'center'
//     }}>
//       <img src={imageSrc} alt="Advertisement" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
//       <div>{text}</div>
//     </div>
//   );
// };

// export default RotatingAdvertisement;



