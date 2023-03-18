import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todoSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { v4 as uuid } from "uuid";
import { toast } from 'react-hot-toast';

function TodoModal({type, modalOpen, setModalOpen }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    if(title === ''){
      toast.error('Please enter a title');
    }
    if (title && status) {
      if(type === 'add'){
          dispatch(
            addTodo({
              id: uuid(),
              title,
              status,
              time: new Date().toLocaleString(),
            })
          );
          toast.success('Task Added Successfully');
          setModalOpen(false)
      }
      if(type === 'update'){
        console.log('updating task');
      }
    }else{
      toast.error("Title Shouldn't be empty")
    }
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose></MdOutlineClose>
          </div>
          <form className={styles.form} onSubmit={(e) => handelSubmit(e)}>
            <h1 className={styles.formTitle}> {type === 'update' ? 'Update' : 'Add' } Task</h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="type">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" varient="primary">
              {type === 'update' ? 'Update' : 'Add' } Task
              </Button>
              <Button
                type="button"
                varient="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
