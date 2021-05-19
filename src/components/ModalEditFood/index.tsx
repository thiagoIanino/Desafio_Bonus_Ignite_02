import { Component, createRef, ReactChild, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FoodsI} from '../../pages/Dashboard'



interface ModalEditFoodI{
  
    isOpen:boolean
    setIsOpen: ()=> void
    editingFood: FoodsI
    handleUpdateFood :(food: FoodsI) => Promise<void>
}

const ModalEditFood = (props:ModalEditFoodI)=> {
  // constructor(props) {
  //   super(props);

  //   this.formRef = createRef()
  // }

 const formRef = useRef(null)

 const  handleSubmit = async (data:FoodsI) => {
    

    props.handleUpdateFood(data);
    props.setIsOpen();
  };

 


    return (
      <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={props.editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }


export default ModalEditFood;
