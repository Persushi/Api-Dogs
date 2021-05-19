import { render, screen } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar_test';

describe('comprobando Navbar', () => {
  it('La navbar debe contener un link a "Dogos"', () => {
    const { container } = render((<Router><Navbar /></Router>));
    const element = container.querySelectorAll('a')[0]
    expect(element.textContent).toBe('Home');
    expect(element.href).toBe('http://localhost/#/Dogos');
  });
  it('La navbar debe contener un link a "Create"', () => {
    const { container } = render((<Router><Navbar /></Router>));
    const element = container.querySelectorAll('a')[1]
    expect(element.textContent).toBe('Creador de Dogos');
    expect(element.href).toBe('http://localhost/#/Create');
  });
});
