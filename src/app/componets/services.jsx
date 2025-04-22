import bdconnect, { CollectionObjName } from "@/lib/bdConnect";
import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const Services = async () => {
    const servicescollection = bdconnect(CollectionObjName.servicecollections);
    const data = await servicescollection.find({}).toArray();
   
    return (
        <div className='grid py-8 lg:py-16 grid-cols-1 lg:max-w-6xl max-w-xl  mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((service) => (
                <div key={service._id} className='p-4 border border-[#444444] shadow-md rounded-2xl w-96 mx-auto'>
                    <Image
                        src={service.img}
                        alt={service.title}
                        className='rounded-2xl object-cover mx-auto'
                        width={340}
                        height={150}
                    />
                    <h1 className='text-[#444444] text-xl lg:text-2xl font-bold mt-4'>
                        {service.title}
                    </h1>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#ffc107]  font-semibold'>${service.price}</p>
                       <Link href={`/services/${service.service_id}`} className='text-[#FF3811] text-2xl'>
                       <button className='text-[#444444] text-lg  flex   items-center justify-center  '>
                           Read more <span className='text-text-black'>......</span> <span className='text-xl mt-2 text-[#FF3811]'> <GoArrowRight /></span> 
                        </button>
                       </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Services;