
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperMenu = () => {
  return (
    <div className=" ">
       <p>Categories</p>
      <Swiper
        className="flex justify-center"
        // install Swiper modules
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={1}
      slidesPerView={3}
      navigation
      
    
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
           
          },
        }}
      >
       
        <SwiperSlide >
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'MenuIcons'} alt="" />
            <p className="font-bold">All Menu</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Coffee'} alt="" />
            <p className="font-bold">Coffee</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Tea'} alt="" />
            <p className="font-bold">Tea</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Mocktail'} alt="" />
            <p className="font-bold">Mocktail</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Rice'} alt="" />
            <p className="font-bold">Rice</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Pasta'} alt="" />
            <p className="font-bold">Pasta</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Burger'} alt="" />
            <p className="font-bold">Burger</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" w-28 border rounded-2xl p-4  flex flex-col items-center border-primary hover:border-red-600  active:border-green-800 bg-white cursor-pointer">
            <img className="w-10" src={'Burger'} alt="" />
            <p className="font-bold">Burger</p>
            <p className="  text-sm">58 items</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default SwiperMenu;
