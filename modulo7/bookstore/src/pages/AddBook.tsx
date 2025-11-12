import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';

const bookSchema = z.object({
  titulo: z.string().min(1, "El titulo es requerido"),
  autor: z.string().min(1, "El autor es requerido"),
  tipo: z.string().min(1, "El tipo es requerido"),
  foto: z.string().min(1, "La foto es requerida"),
  precio: z.string().min(1, "El precio es requerido")
});

type BookFormValues = z.infer<typeof bookSchema>;

const AddBook = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema)
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      if (!user) {
        toast.error('No hay usuario autenticado');
        return;
      }

      await axios.post('http://localhost:3000/api/books', {
        id_user: user.id_user,
        title: data.titulo,
        type: data.tipo,
        author: data.autor,
        price: parseFloat(data.precio),
        photo: data.foto
      });

      toast.success('¡Libro añadido exitosamente!');
      reset();
      navigate('/books');
    } catch (error: any) {
      toast.error('Error al añadir el libro. Intenta de nuevo');
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Añadir Libro</h1>
        <p className="text-center text-gray-600 mb-6">Añade un libro a tu lista</p>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              {...register("titulo")}
              placeholder="Harry Potter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.titulo && <p className="text-red-600 text-sm mt-1">{errors.titulo.message}</p>}
          </div>

          <div>
            <label htmlFor="autor" className="block text-gray-700 font-medium mb-2">
              Autor:
            </label>
            <input
              type="text"
              id="autor"
              {...register("autor")}
              placeholder="J.K. Rowling"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.autor && <p className="text-red-600 text-sm mt-1">{errors.autor.message}</p>}
          </div>

          <div>
            <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">
              Tipo de libro:
            </label>
            <select
              id="tipo"
              {...register("tipo")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Tapa blanda">Tapa blanda</option>
              <option value="Tapa Dura">Tapa Dura</option>
            </select>
            {errors.tipo?.message && <p className="text-red-600 text-sm mt-1">{errors.tipo.message}</p>}
          </div>

          <div>
            <label htmlFor="foto" className="block text-gray-700 font-medium mb-2">
              Foto:
            </label>
            <input
              type="text"
              id="foto"
              {...register("foto")}
              placeholder="https://photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.foto && <p className="text-red-600 text-sm mt-1">{errors.foto.message}</p>}
          </div>

          <div>
            <label htmlFor="precio" className="block text-gray-700 font-medium mb-2">
              Precio:
            </label>
            <input
              type="text"
              id="precio"
              {...register("precio")}
              placeholder="19.90"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.precio && <p className="text-red-600 text-sm mt-1">{errors.precio.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Añadir Libro
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
