import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const EditBook = () => {
  const { id_book } = useParams<{ id_book: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [bookTitle, setBookTitle] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema)
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!user || !id_book) {
          toast.error('Error: datos incompletos');
          navigate('/books');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/books?id_user=${user.id_user}`);
        const book = response.data.find((b: any) => b.id_book === parseInt(id_book));
        
        if (book) {
          setBookTitle(book.title);
          setValue('titulo', book.title);
          setValue('autor', book.author);
          setValue('tipo', book.type);
          setValue('foto', book.photo);
          setValue('precio', book.price.toString());
          setLoading(false);
        } else {
          toast.error('Libro no encontrado');
          navigate('/books');
        }
      } catch (error) {
        toast.error('Error al cargar el libro');
        console.error('Error fetching book:', error);
        navigate('/books');
      }
    };

    fetchBook();
  }, [id_book, user, navigate, setValue]);

  const onSubmit = async (data: BookFormValues) => {
    try {
      if (!user || !id_book) {
        toast.error('Error: datos incompletos');
        return;
      }

      await axios.put(`http://localhost:3000/api/books/${id_book}`, {
        id_user: user.id_user,
        title: data.titulo,
        type: data.tipo,
        author: data.autor,
        price: parseFloat(data.precio),
        photo: data.foto
      });

      toast.success('¡Libro actualizado exitosamente!');
      navigate('/books');
    } catch (error: any) {
      toast.error('Error al actualizar el libro. Intenta de nuevo');
      console.error('Error updating book:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Cargando libro...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Editar Libro</h1>
        <p className="text-center text-gray-600 mb-6">{bookTitle}</p>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              {...register("titulo")}
              placeholder="El Perfume"
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
              placeholder="Patrick Süskind"
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
            {errors.tipo && <p className="text-red-600 text-sm mt-1">{errors.tipo.message}</p>}
          </div>

          <div>
            <label htmlFor="foto" className="block text-gray-700 font-medium mb-2">
              Foto:
            </label>
            <input
              type="text"
              id="foto"
              {...register("foto")}
              placeholder="https://pictures.abebooks..."
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
              placeholder="19.9"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.precio && <p className="text-red-600 text-sm mt-1">{errors.precio.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Actualizar Libro
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
