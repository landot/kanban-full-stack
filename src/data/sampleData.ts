import { Board } from "../types/data";

export const sampleBoard: Board = {
    id: 'asdf',
    name: 'board 1',
    columns: [
        {
        name: 'Column1',
        id: 'col1', 
        color: '#49C4E5',
        tasks: [
          {
              id: '5555',
              title: 'Build UI for onboarding',
              description: 'this is the description for the task asdfasdfasdfasfd',
              status: 'Column1',
              subtasks: [
                  {
                      id: '123456',
                      title: 'create design for UI',
                      isCompleted: true
                  },
                  {
                      id: '123457',
                      title: 'develop MVP',
                      isCompleted: false
                  },
                  {
                      id: '123458',
                      title: 'test MVP',
                      isCompleted: false
                  }
              ]
          },
          {
              id: '6666',
              title: 'Test new UI',
              description: 'this is the description for the task asdfasdfasdfasfd',
              status: 'Column1',
              subtasks: [
                  {
                      id: '1123456',
                      title: 'accessibility testing',
                      isCompleted: true
                  },
                  {
                      id: '1123457',
                      title: 'performance testing',
                      isCompleted: false
                  },
                  {
                      id: '1123458',
                      title: 'sign off from QA',
                      isCompleted: false
                  }
              ]
          }
      ]
      },
      {
        name: 'Column2',
        id: 'col2', 
        color: '#8471F2',
        tasks: []
      },
      {
        name: 'Column3',
        id: 'col3', 
        color: '#67E2AE',
        tasks: []
      }
    ] 
};