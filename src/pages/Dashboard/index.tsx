import { Component, useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';


export interface FoodsI {
id:number;
name:string
description:string
price:string
available:boolean
image:string
}

const Dashboard = () => {

const [foods,setFoods] = useState<FoodsI[]>([])
const [editingFood,setEditingFood] = useState<FoodsI>({} as FoodsI)
const [modalOpen,setModalOpen] = useState(false)
const [editModalOpen,setEditModalOpen] = useState(false)

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  useEffect(()=>{
    async function componentDidMount() {
      const response = await api.get<FoodsI[]>('/foods');
  
      setFoods(response.data)
    }
   componentDidMount()
  },[])


  const handleAddFood = async (food:FoodsI) => {
    const  Foods  = [...foods];

    try {
      const response = await api.post<FoodsI>('/foods', {
        ...food,
        available: true,
      });
       Foods.push(response.data)
      setFoods( Foods);
    } catch (err) {
      console.log(err)
      window.alert(err);
    }
  }

  const handleUpdateFood = async (food:FoodsI) => {
  
    const  Foods  = [...foods];
      
    
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = Foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated );
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id:number) => {
    
    const  Foods  = [...foods];

    await api.delete(`/foods/${id}`);

    const foodsFiltered = Foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    const ModalOpen = modalOpen

    setModalOpen( !ModalOpen );
  }

  const toggleEditModal = () => {
    const EditModalOpen = editModalOpen

    setEditModalOpen(!EditModalOpen );
  }

  const handleEditFood = (food:FoodsI) => {
    
    setEditingFood(food)
    setEditModalOpen(true)
  }

    
   
    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {
            foods.map(food => (
              
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  
};

export default Dashboard;
