import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase/firestore';
import { FirestoreService } from 'src/core/providers';
import { Todo } from '../../domain';
import { TodoEntity } from '../entities/todo.entity';

import { ITodoService } from './todo.service.interface';

@Injectable()
export class FirebaseTodoService implements ITodoService {
  private collection: CollectionReference<Todo>;

  private readonly firestoreConverter = {
    toFirestore: this.toFirestore,
    fromFirestore: this.fromFirestore,
  };

  constructor(private readonly firestore: FirestoreService) {
    this.collection = this.firestore
      .collection('todos')
      .withConverter<Todo>(this.firestoreConverter);
  }

  private toFirestore(todo: Todo): any {
    return JSON.parse(JSON.stringify(todo));
  }

  private fromFirestore(snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new TodoEntity(data.id, data.name, data.industry, data.size);
  }

  async get(id: string): Promise<Todo> {
    const doc = this.firestore
      .doc(this.collection.id, id)
      .withConverter<Todo>(this.firestoreConverter);
    const docSnap = await this.firestore.getDoc<Todo>(doc);
    if (docSnap.exists()) return docSnap.data();

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${id}) does not exist.`),
    });
  }

  async getAll(): Promise<Todo[]> {
    const snapshots = await this.firestore.getDocs(this.collection);
    return snapshots.docs.map((snapshot) => snapshot.data());
  }

  async add(todo: Todo): Promise<Todo> {
    const doc = await this.firestore.addDoc<Todo>(this.collection, todo);
    await this.firestore.updateDoc(doc, { id: doc.id });
    return (await this.firestore.getDoc<Todo>(doc)).data();
  }

  async query(field: string, operator: any, value: string): Promise<Todo[]> {
    const constraint = this.firestore.where(field, operator, value);
    const query = this.firestore
      .query(this.collection, constraint)
      .withConverter(this.firestoreConverter);
    const snapshots = await this.firestore.getDocs(query);
    return snapshots.docs.map((snapshot) => snapshot.data());
  }

  async update(todo: Todo): Promise<Todo> {
    const doc = this.firestore
      .doc(this.collection.id, todo.id)
      .withConverter<Todo>(this.firestoreConverter);

    const docSnap = await this.firestore.getDoc<Todo>(doc);
    if (docSnap.exists()) {
      await this.firestore.updateDoc<Todo>(doc, this.toFirestore(todo));
      return (await this.firestore.getDoc<Todo>(doc)).data();
    }

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${todo.id}) does not exist.`),
    });
  }

  async delete(id: string): Promise<void> {
    const doc = this.firestore
      .doc(this.collection.id, id)
      .withConverter<Todo>(this.firestoreConverter);

    const docSnap = await this.firestore.getDoc<Todo>(doc);
    if (docSnap.exists()) return await this.firestore.deleteDoc(doc);

    throw new HttpException('todo not found.', HttpStatus.BAD_REQUEST, {
      cause: new Error(`The specified id(${id}) does not exist.`),
    });
  }
}
