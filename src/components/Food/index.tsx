import { Component, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { FoodsI } from '../../pages/Dashboard';

interface FoodI {
  key: number
  food: FoodsI
  handleDelete: (id: number) => Promise<void>

  handleEditFood: (food: FoodsI) => void
}

const Food = (props:FoodI)=> {

 
  
const [isAvailable, setIsAvailable] = useState(props.food.available)

  // constructor(props) {
  //   super(props);

  //   const { available } = this.props.food;
  //   this.state = {
  //     isAvailable: available
  //   };
  // }

 const toggleAvailable = async () => {
  
    // const { food } = this.props;
    // const { isAvailable } = this.state;
const IsAvailable = isAvailable

    await api.put(`/foods/${props.food.id}`, {
      ...props.food,
      available: !IsAvailable,
    });

    setIsAvailable( !isAvailable );
  }

  const setEditingFood = () => {
   

    props.handleEditFood(props.food);
  }

  
    // const { isAvailable } = this.state;
    // const { food, handleDelete } = this.props;

    return (
      <Container available={isAvailable}>
        <header>
          <img src={props.food.image} alt={props.food.name} />
        </header>
        <section className="body">
          <h2>{props.food.name}</h2>
          <p>{props.food.description}</p>
          <p className="price">
            R$ <b>{props.food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${props.food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => props.handleDelete(props.food.id)}
              data-testid={`remove-food-${props.food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${props.food.id}`} className="switch">
              <input
                id={`available-switch-${props.food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${props.food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
  }


export default Food;
