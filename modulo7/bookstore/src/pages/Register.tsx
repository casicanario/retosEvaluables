import { useState, FormEvent, ChangeEvent } from 'react';

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    apellidos: '',
    email: '',
    foto: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    apellidos: '',
    email: '',
    foto: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    // Validación en tiempo real
    const newErrors = { ...errors };

    if (name === 'name') {
      if (value === '') {
        newErrors.name = 'El nombre es requerido';
      } else {
        newErrors.name = '';
      }
    }

    if (name === 'apellidos') {
      if (value === '') {
        newErrors.apellidos = 'Los apellidos son requeridos';
      } else {
        newErrors.apellidos = '';
      }
    }

    if (name === 'email') {
      if (value === '') {
        newErrors.email = 'El email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'El email no es válido';
      } else {
        newErrors.email = '';
      }
    }

    if (name === 'foto') {
      if (value === '') {
        newErrors.foto = 'La foto es requerida';
      } else {
        newErrors.foto = '';
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

      // Validar repeatPassword también cuando password cambie
      if (formValues.repeatPassword && value !== formValues.repeatPassword) {
        newErrors.repeatPassword = 'Las contraseñas no coinciden';
      } else if (formValues.repeatPassword) {
        newErrors.repeatPassword = '';
      }
    }

    if (name === 'repeatPassword') {
      if (value === '') {
        newErrors.repeatPassword = 'Repetir contraseña es requerido';
      } else if (value !== formValues.password) {
        newErrors.repeatPassword = 'Las contraseñas no coinciden';
      } else {
        newErrors.repeatPassword = '';
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Register data:', formValues);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-600 mb-2">Registrarse</h1>
        <p className="text-center text-gray-600 mb-6">¡Regístrate para guardar tus libros!</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Iván"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="apellidos" className="block text-gray-700 font-medium mb-2">
              Apellidos:
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formValues.apellidos}
              onChange={handleChange}
              placeholder="Pérez"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.apellidos && <p className="text-red-600 text-sm mt-1">{errors.apellidos}</p>}
          </div>

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
            <label htmlFor="foto" className="block text-gray-700 font-medium mb-2">
              Foto:
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              value={formValues.foto}
              onChange={handleChange}
              placeholder="https://photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.foto && <p className="text-red-600 text-sm mt-1">{errors.foto}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Contraseña:
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

          <div>
            <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">
              Repetir contraseña:
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formValues.repeatPassword}
              onChange={handleChange}
              placeholder="1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-100"
            />
            {errors.repeatPassword && <p className="text-red-600 text-sm mt-1">{errors.repeatPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
