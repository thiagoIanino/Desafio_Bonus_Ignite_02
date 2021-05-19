import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FoodsI} from '../../pages/Dashboard'

interface ModalAddFoodI{
  isOpen:boolean
setIsOpen: () => void
handleAddFood: (food: FoodsI) => Promise<void>

}

const ModalAddFood = (props:ModalAddFoodI)=> {
  

  const formRef = useRef(null);
  

  const handleSubmit = async (data:FoodsI) => {
    

    props.handleAddFood(data);
    props.setIsOpen();
  };

  
    

    return (
      
      <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <Form  onSubmit={handleSubmit} ref={formRef}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  
};

export default ModalAddFood;
