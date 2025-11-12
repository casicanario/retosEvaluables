import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Validación en tiempo real
    const newErrors = { ...errors };

    if (name === 'email') {
      if (value === '') {
        newErrors.email = 'El email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'El email no es válido';
      } else {
        newErrors.email = '';
      }
    }

    if (name === 'password') {
      if (value === '') {
        newErrors.password = 'La contraseña es requerida';
      } else if (value.length < 4) {
        newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
      } else {
        newErrors.password = '';
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validar que no haya errores
    if (errors.email || errors.password) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email: formValues.email,
        password: formValues.password
      });

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast.success('¡Login exitoso! Bienvenido');
      navigate('/books');
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Email o contraseña incorrectos');
      } else {
        toast.error('Error al iniciar sesión. Intenta de nuevo');
      }
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Log In</h1>
        <p className="text-center text-gray-600 mb-6">¡Loguéate en tu cuenta!</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="email@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
