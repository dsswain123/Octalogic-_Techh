

// Optional GraphQL API Implementation for the Current Project


const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
  } = require('graphql');
  const { User } = require('../DB/user');
  const { Vehicle } = require('../DB/vehicle');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  
  // Define UserType once
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: GraphQLString },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
    },
  });
  
  // Define VehicleType once
  const VehicleType = new GraphQLObjectType({
    name: 'Vehicle',
    fields: {
      id: { type: GraphQLString },
      licensePlate: { type: GraphQLString },
      typeId: { type: GraphQLString },
    },
  });
  
  // RootQuery
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      vehicles: {
        type: new GraphQLList(VehicleType),
        resolve: async () => await Vehicle.findAll(),
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => await User.findAll(),
      },
    },
  });
  
  // Mutations
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      registerUser: {
        type: UserType,
        args: {
          username: { type: new GraphQLNonNull(GraphQLString) }, 
          email: { type: new GraphQLNonNull(GraphQLString) }, 
          password: { type: new GraphQLNonNull(GraphQLString) }, 
        },
        resolve: async (_, { username, email, password }) => {
          const hashedPassword = await bcrypt.hash(password, 10);
          return await User.create({ username, email, password: hashedPassword });
        },
      },
      loginUser: {
        type: GraphQLString,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) }, 
          password: { type: new GraphQLNonNull(GraphQLString) }, 
        },
        resolve: async (_, { email, password }) => {
          const user = await User.findOne({ where: { email } });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
          }
          return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        },
      },
      createVehicle: {
        type: VehicleType,
        args: {
          licensePlate: { type: new GraphQLNonNull(GraphQLString) }, 
          typeId: { type: new GraphQLNonNull(GraphQLString) }, 
        },
        resolve: async (_, { licensePlate, typeId }) =>
          await Vehicle.create({ licensePlate, typeId }),
      },
      bookVehicle: {
        type: GraphQLString,
        args: {
          licensePlate: { type: new GraphQLNonNull(GraphQLString) }, 
        },
        resolve: async (_, { licensePlate }) => {
          const vehicle = await Vehicle.findOne({ where: { licensePlate } });
          if (!vehicle) throw new Error('Vehicle not found');
          return 'Vehicle booked successfully';
        },
      },
    },
  });
  
  module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
  