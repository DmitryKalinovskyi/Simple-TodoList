﻿using Simple_TodoList.Models;

namespace Simple_TodoList.Repositories
{
    public interface ITasksRepository
    {
        #region CRUD
        public Task<TaskModel> Insert(TaskModel task);

        public Task<TaskModel?> GetById(int id);

        public Task Update(int id, TaskModel task);

        public Task Delete(int id);

        #endregion

        public Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering();

        public Task<IEnumerable<TaskModel>> GetAll();

        public Task UpdateComplition(int id, bool isComplete);
    }
}
