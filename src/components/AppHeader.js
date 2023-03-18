import React, { useState } from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
    <div className={styles.appHeader}>
        <Button type='buttom' varient='primary' onClick={()=>
        setModalOpen(true)}>Add Task</Button>
        <SelectButton id='status'>
            <option value='all'>ALL</option>
            <option value='incomplete'>Incomplete</option>
            <option value='complete'>Complete</option>
        </SelectButton>
    </div>
        <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader