import img from "../../assets/loading.png";
import "./Loading.css"; // Create this CSS file

const Loading = () => {
  return (
    <div className='flex justify-center h-full items-center mt-32'>
      <img 
        src={img} 
        className=' loading-spinner' 
        alt="loading image" 
      />
    </div>
  );
};

export default Loading;