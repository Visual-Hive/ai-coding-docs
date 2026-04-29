/**
 * Domain configuration. Edit this file to declare your entities.
 *
 * `pnpm generate:overview` reads this file to produce `overview/entities.md`.
 *
 * Conventions:
 * - Each entity has a plain-English `description` a non-developer can read.
 * - `fields` lists key columns with type and notes.
 * - `relationships` is an array of English-language strings describing
 *   how this entity connects to others.
 */
export default {
  entities: [
    {
      name: 'Member',
      description:
        'A person who has signed up. Members register for events, complete courses, receive newsletters.',
      fields: [
        { name: 'id', type: 'uuid', notes: 'PK' },
        { name: 'email', type: 'string', notes: 'unique, lowercase' },
        { name: 'name', type: 'string', notes: 'display name' },
        { name: 'created_at', type: 'timestamp', notes: 'default now()' },
      ],
      relationships: [
        'has many Registrations (one per event)',
        'has many Enrolments (one per course)',
      ],
    },
    // Add more entities here. Run `pnpm generate:overview` after any change.
  ],
};
