import { GoSignOut } from 'react-icons/go';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const arr = [1, 2, 3];

export default function Home() {
  return (
    <main>
      <div className='bg-slate-600 text-white w-44 py-4 mt-5 rounded-lg transition-transform hover:bg-black/[0.8] 
      active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-90 right-5 cursor-pointer'>
        <GoSignOut size={15} />
        <span>Logout</span>
      </div>
      <br />
      <br />
      <div className='max-w-3xl mx-auto mt-10 p-8'>
        <div className='bg-white m-6 p-3 sticky top-0'>
          <div className='flex justify-center flex-col items-center'>
            <span className='text-7xl mb-10 font-bold text-center'>Organize your life and work</span>
            <h1 className='text-5xl md:text-7xl font-bold text-cyan-600'>To Do List</h1>
          </div>
        </div>
        <div className='flex items-center gap-2 mt-10'>
          <input
            type='text'
            className='font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 
          focus-visible:outline-yellow-400 text-lg transition-all duration-300'
            placeholder='Hello user, please add new todo'
            autoFocus
          />
          <button className='w-[60px] h-[60px] rounded-md bg-amber-500 flex justify-center items-center 
          cursor-pointer transition-all duration-300 hover:bg-black/[0.8]'><AiOutlinePlus size={30} /></button>
        </div>
        <div className='mt-10'>
          {arr.map((todo, index) => (
            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-3'>
                <input id={`todo-${index}`} type='checkbox' className='w-4 h-4 accent-green-400 rounded-lg' />
                <label htmlFor={`todo-${index}`} className='font-medium'>Your todo list</label>
              </div>
              <div className='flex items-center gap-3'>
              <MdDeleteForever size={24} className='text-red-400 hover:text-red-600 cursor-pointer' />
            </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
