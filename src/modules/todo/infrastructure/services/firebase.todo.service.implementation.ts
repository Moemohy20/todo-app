import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase/firestore';
import { FirestoreService } from 'src/core/providers';
import { ITodo } from '../../domain';
import { Todo } from '../models/todo.model.implementation';

import { ITodoService } from './todo.service.interface';

@Injectable()
export class FirebaseTodoService implements ITodoService {
  private collection: CollectionReference<ITodo>;

  private readonly firestoreConverter = {
    toFirestore: this.toFirestore,
    fromFirestore: this.fromFirestore,
  };

  constructor(private readonly firestore: FirestoreService) {
    this.collection = this.firestore.collection('todos').withConverter<ITodo>(this.firestoreConverter);
  }

  private toFirestore(todo: ITodo): any {
    return JSON.parse(JSON.stringify(todo));
  }

  private fromFirestore(snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new Todo(data.id, data.title, data.content, data.todoStatus, data.listId);
  }

  async get(id: string): Promise<ITodo> {
    const doc = this.firestore.doc(this.collection.id, id).withConverter<ITodo>(this.firestoreConverter);
    const docSnap = await this.firestore.getDoc<ITodo>(doc);
    if (docSnap.exists()) return docSnap.data();

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${id}) does not exist.`),
    });
  }

  async getAll(): Promise<ITodo[]> {
    const snapshots = await this.firestore.getDocs(this.collection);
    return snapshots.docs.map((snapshot) => snapshot.data());
  }

  async add(todo: ITodo): Promise<ITodo> {
    const doc = await this.firestore.addDoc<ITodo>(this.collection, todo);
    await this.firestore.updateDoc(doc, { id: doc.id });
    return (await this.firestore.getDoc<ITodo>(doc)).data();
  }

  async query(field: string, operator: any, value: string): Promise<ITodo[]> {
    const constraint = this.firestore.where(field, operator, value);
    const query = this.firestore.query(this.collection, constraint).withConverter(this.firestoreConverter);
    const snapshots = await this.firestore.getDocs(query);
    return snapshots.docs.map((snapshot) => snapshot.data());
  }

  async update(todo: ITodo): Promise<ITodo> {
    const doc = this.firestore.doc(this.collection.id, todo.id).withConverter<ITodo>(this.firestoreConverter);

    const docSnap = await this.firestore.getDoc<ITodo>(doc);
    if (docSnap.exists()) {
      await this.firestore.updateDoc<ITodo>(doc, this.toFirestore(todo));
      return (await this.firestore.getDoc<ITodo>(doc)).data();
    }

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${todo.id}) does not exist.`),
    });
  }

  async delete(id: string): Promise<void> {
    const doc = this.firestore.doc(this.collection.id, id).withConverter<ITodo>(this.firestoreConverter);

    const docSnap = await this.firestore.getDoc<ITodo>(doc);
    if (docSnap.exists()) return await this.firestore.deleteDoc(doc);

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${id}) does not exist.`),
    });
  }
}
