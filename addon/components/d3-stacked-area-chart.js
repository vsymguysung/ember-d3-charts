import Ember from 'ember';
import layout from '../templates/components/d3-stacked-area-chart';
import StackLayout from 'ember-d3-components/utils/layouts/d3-stack-layout';
import Accessor from 'ember-d3-components/utils/accessor';

export default Ember.Component.extend({
  layout,

  init() {
    this._super(...arguments);
    this.xAccessor = this.xAccessor || Accessor.create({name: "x"});
    this.y0Accessor = this.y0Accessor || Accessor.create({name: "y0"});
    let y0Accessor = this.y0Accessor;
    let yAccessor = Accessor.create({name: "y"});
    yAccessor.set('extract', (dataPoint) => {
      return dataPoint[yAccessor.get('name')] + y0Accessor.extract(dataPoint);
    });

    this.yAccessor = this.yAccessor || yAccessor;
  },

  d3layout: StackLayout.create({offset: 0}),

  layoutData: Ember.computed('data', function() {
    return this.get('d3layout').layout(this.get('data'));
  }),

  d3Transition(component, d3Data) {
    d3Data.transition();
  }
});
