/*!
 * PENTAHO CORPORATION PROPRIETARY AND CONFIDENTIAL
 *
 * Copyright 2002 - 2014 Pentaho Corporation (Pentaho). All rights reserved.
 *
 * NOTICE: All information including source code contained herein is, and
 * remains the sole property of Pentaho and its licensors. The intellectual
 * and technical concepts contained herein are proprietary and confidential
 * to, and are trade secrets of Pentaho and may be covered by U.S. and foreign
 * patents, or patents in process, and are protected by trade secret and
 * copyright laws. The receipt or possession of this source code and/or related
 * information does not convey or imply any rights to reproduce, disclose or
 * distribute its contents, or to manufacture, use, or sell anything that it
 * may describe, in whole or in part. Any reproduction, modification, distribution,
 * or public display of this information without the express written authorization
 * from Pentaho is strictly prohibited and in violation of applicable laws and
 * international treaties. Access to the source code contained herein is strictly
 * prohibited to anyone except those individuals and entities who have executed
 * confidentiality and non-disclosure agreements or other agreements with Pentaho,
 * explicitly covering such access.
 */

var analyzerPlugins = analyzerPlugins || [];
analyzerPlugins.push({

  init : function() {

    // Register visualizations to display in Analyzer
    cv.pentahoVisualizations.push(pentaho.visualizations.getById('weka-classify'));
    cv.pentahoVisualizations.push(pentaho.visualizations.getById('weka-cluster'));
    cv.pentahoVisualizations.push(pentaho.visualizations.getById('weka-attribute-selection'));

    /**
     * Helpers contain code that are container specific such as Analyzer context. The
     * one function that's required "generateOptionsFromAnalyzerState" is called
     * so the visualization can set its own options based on Analyzer's options.
     * 
     */
    cv.pentahoVisualizationHelpers['weka-classify'] = {

     
      /**
       * This method allows you to translate Analyzer's chart options into your
       * own visualization's options.
       * 
       */
      generateOptionsFromAnalyzerState : function(report) {
        return {
          bgColor : report.reportDoc.getChartOption("backgroundColor"),
          labelSize : report.reportDoc.getChartOption("labelSize")
        };
      }
    };
    cv.pentahoVisualizationHelpers['weka-cluster'] = cv.pentahoVisualizationHelpers['weka-classify'];
    cv.pentahoVisualizationHelpers['weka-attribute-selection'] = cv.pentahoVisualizationHelpers['weka-classify'];

    /**
     * DtLayoutConfig will allow you to handle layout panel changes such as
     * updating the visualization based on a custom control added by the visualization.
     * 
     */
    dojo.declare("DtLayoutConfig", [ analyzer.LayoutConfig ], {

      /**
       * @param config
       *          The parse Configuration object which serves as the model of
       *          the Panel.
       * @param item
       *          The item in the panel which originated the event.
       * @param eventName
       *          The name of the event (clicked, value, etc).
       * @param args
       *          A Hash Object containing relevent values (prevVal, newVal,
       *          etc).
       */
      onModelEvent : function(config, item, eventName, args) {

        if (eventName == "value") {
          // Most custom controls such as textboxes, dropdowns, sliders, radio buttons will trigger this event.
          this.report.visualization.args[item.id] = item.value;

          // Add a report state item to the undo/redo history stack.
          this.report.history.add(new cv.ReportState("Update " + item.id + " to " + item.value));

          // Trigger a report refresh so that the visualization is updated with the changes.
          this.report.refreshReport();
        }
        
        // Let super class handle all other events such as adding/removing fields.
        this.inherited(arguments);
      }
    });

    // Register the Layout Panel Configuration Manager.
    // Note that the string entry matches 'JSON_' plus the visualization id defined earlier.
    analyzer.LayoutPanel.configurationManagers['JSON_weka-classify'] = DtLayoutConfig;
    analyzer.LayoutPanel.configurationManagers['JSON_weka-cluster'] = DtLayoutConfig;
    analyzer.LayoutPanel.configurationManagers['JSON_weka-attribute-selection'] = DtLayoutConfig;
  }
});

function exportModel() {
  // Setting this flag tells the backend renderer to export the model as opposed to generating the
  // model JSON output
  cv.getActiveReport().visualization.args['exportModel'] = true;
  cv.getActiveReport().saveUIAttributes();
  var requestId = null;
  try {
    requestId = cv.io.initAsyncRequest({
              reportXML:cv.getActiveReport().getReportXml(),
              action:"REFRESH",
              format:"CSV",
              dirtyFlag:false,
              prevId:""});
  } finally {
    cv.getActiveReport().visualization.args['exportModel'] = false;
    cv.getActiveReport().saveUIAttributes();    
  }
  var url = "service/ajax/getReportHTML?requestId="+requestId+"&timeout=-1";
  window.open(url);
}