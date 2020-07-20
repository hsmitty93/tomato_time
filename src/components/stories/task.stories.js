import React from 'react';
import { Task } from '../task'

export default {
  title: "Task"
}

const task = {
  content: "Hello",
  isCompleted: false,
  inProgress: false
}

export const withShortText = () => <Task task={task} />

export const withLongText = () => <Task text="This is a task with long text. I don't think longer is all that great though." />


