export function validateTitle(title) {
  // TODO: Validate task title
  const MAX_TITLE_LENGTH = 200;
  if (typeof title !== "string") {
    throw new TypeError("Task title must be a string");
  }
  const normalizedTitle = title.trim();
  if (normalizedTitle.length === 0) {
    throw new RangeError("Task title cannot be empty");
  }
  if (normalizedTitle.length > MAX_TITLE_LENGTH) {
    throw new RangeError("Task title cannot exceed 200 characters");
  }
  return normalizedTitle;
}



export function validateTask(task) {
  // TODO: Validate complete task object
  if(typeof task !== "object" || task ===null || Array.isArray(task)){
    throw new TypeError("Task must be an object"); 
  }
  if(Number.isSafeInteger(task.id) === false || task.id <= 0){
    throw new RangeError("Task id must be a positive integer");
  }
  validateTitle(task.title);
  if(typeof task.completed !== "boolean"){
    throw new TypeError("Task completed must be a boolean");
  }
  if (typeof task.createdAt !== "string") {
    throw new TypeError("createdAt must be a string");
  }
  const date = new Date(task.createdAt);
  if(Number.isNaN(date.getTime())){
    throw new RangeError("createdAt must be a valid date string");
  }
  if(date.toISOString() !== task.createdAt){
    throw new RangeError("createdAt must be a valid ISO 8601 date string");
  }
  return true;
  
}
