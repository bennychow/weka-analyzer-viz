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
var analyzerApi;

// Utilize the required API for verifying that the VizController has been loaded before registration
pen.require(
	[ "analyzer/cv_api", "cdf/lib/jquery", "dijit/TitlePane", "common-ui/vizapi/VizController" ],
	function(api, $, TitlePane) {
    analyzerApi = api;
    
	  // Define and register classification viz
	  pentaho.visualizations.push({
		id : 'weka-classify',        // unique identifier
		type : 'weka-classify',      // generic type id
		source : 'weka-classify',    // id of the source library
		name : 'Decision Tree',     // visible name that can be translated
		'class' : 'pentaho.sample.WekaViz',  // type of the Javascript object to instantiate
		args : {
		  minNumObjs : 2,
		  confidence : 25,
		  folds : 10,
      includeExportPane: true,
      drillthrough : false
		},
		propMap : [],
		dataReqs : [ {
        name : 'Default',
        reqs : [ {
        id : 'include',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Attributes',
        required : true,
        allowMultiple : true
		  }, {
        id : 'target',
        dataType : 'string',
        dataStructure : 'column',
        caption : 'Target',
        required : true,
        allowMultiple : false
		  }, {
        id : 'exclude',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Instance ID',
        required : false,
        allowMultiple : true
		  }, {
        id : 'minNumObjs',
        dataType : 'string',
        ui : {
          group : 'options',
          type : 'textbox',
          caption : "Minimum Instances Per Node"
        }
		  }, {
        id : 'confidence',
        dataType : 'number',
        uiType : 'slider',
        ui : {
          group : "options",
          type : 'slider',
          caption : "Confidence Factor (0-100%)"
        }
		  }, {
        id : 'folds',
        dataType : 'number',
        values: ["3", "5", "10"],
        ui : {
          labels: ["3","5","10"],
          group : "options",
          type : 'combo',
          caption : "Cross Validation Folds"
        }
		  }, {
        id : 'drillthrough',
        dataType : 'boolean',
        ui : {
          label: "Enable Drillthrough",
          group : "options",
          type : 'checkbox'
        }
		  }]
		} ],
		menuOrdinal : 10001,
		menuSeparator : true
	  });

	// Define and register cluster viz	  
	pentaho.visualizations.push({
		id : 'weka-cluster',        // unique identifier
		type : 'weka-cluster',      // generic type id
		source : 'weka-cluster',    // id of the source library
		name : 'Cluster',     // visible name that can be translated
		'class' : 'pentaho.sample.WekaViz',  // type of the Javascript object to instantiate
		args : {
		  numClusters : 2,
      includeExportPane: true,
      seed : 10,
      initMethod : 0,
      displayStdDevs : false,
      numExecutionSlots : 1,
      includeDecisionTree : false,
      minNumObjs : 10,
		},
		propMap : [],
		dataReqs : [ {
		  name : 'Default',
		  reqs : [ {
        id : 'include',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Attributes',
        required : true,
        allowMultiple : true
		  }, {
        id : 'target',
        dataType : 'string',
        dataStructure : 'column',
        caption : 'Class to Cluster',
        required : false,
        allowMultiple : false
		  }, {
        id : 'exclude',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Instance ID',
        required : false,
        allowMultiple : true
		  }, {
        id : 'numClusters',
        dataType : 'string',
        ui : {
          group : 'options',
          type : 'textbox',
          caption : "Number of Clusters"
        }
      }, {
        id : 'initMethod',
        dataType : 'number',
        values: ["0", "1", "2", "3"],
        ui : {
          labels: ["Random","k-means++","Canopy","Farthest first"],
          group : "options",
          type : 'combo',
          caption : "Initialization Method"
        }
		  }, {
        id : 'displayStdDevs',
        dataType : 'boolean',
        ui : {
          label: "Display Standard Deviations",
          group : "options",
          type : 'checkbox'
        }
		  }, {
        id : 'includeDecisionTree',
        dataType : 'boolean',
        ui : {
          label: "Build Decision Tree",
          group : "options",
          type : 'checkbox'
        }
		  }, {
        id : 'minNumObjs',
        dataType : 'string',
        ui : {
          group : 'options',
          type : 'textbox',
          caption : "Minimum Instances Per Node"
        }
		  }]
		} ],
		menuOrdinal : 10030
	  });
    
    // Define and register attribute selection viz	  
	pentaho.visualizations.push({
		id : 'weka-attribute-selection',        // unique identifier
		type : 'weka-attribute-selection',      // generic type id
		source : 'weka-attribute-selection',    // id of the source library
		name : 'Attribute Selection',     // visible name that can be translated
		'class' : 'pentaho.sample.WekaViz',  // type of the Javascript object to instantiate
		args : {
		  includeExportPane: false,
      rank: false
		},
		propMap : [],
		dataReqs : [ {
		  name : 'Default',
		  reqs : [ {
        id : 'include',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Attributes',
        required : true,
        allowMultiple : true
		  }, {
        id : 'target',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Class to Evaluate',
        required : true,
        allowMultiple : false
		  }, {
        id : 'exclude',
        dataType : 'number, string',
        dataStructure : 'column',
        caption : 'Instance ID',
        required : false,
        allowMultiple : true
		  }, {
        id : 'rank',
        dataType : 'boolean',
        ui : {
          label: "Rank Attributes",
          group : "options",
          type : 'checkbox'
        }
		  }]
		} ],
		menuOrdinal : 10050
	  });

	  /* define a namespace for this sample to live in */
	  pentaho.sample = {};
	  /* define the WekaViz visualization class */

	  pentaho.sample.WekaViz = function(targetDiv) {
      
      this.targetDiv = targetDiv;
      this.treeDiv;
      this.width;
      this.height;
      this.formatPercent = d3.format(".1%");
      this.options = null;

      /**
       * Sets up the target DIV with dojo title panes to hold the decision tree
       * and other model outputs.
       * 
       * dataTable - Contains the data to renderer however for this demo we use the Weka graph output instead.
       * options - Contains container specific configuration information including previous saved state (if any)
       * 
       */
      this.draw = function(dataTable, options) {
      
        this.options = options;
        this.targetDiv.style.backgroundColor = options.bgColor;

        this.dataTable = dataTable;
        this.options = options;
        
        // This was set by the custom backend renderer and includes the Weka decision tree graph in JSON format
        this.data = eval('(' + cv.getActiveReport().localData + ')');
        if (!this.data.weka) {
          alert("Unable to display model output from server.");
          return;
        }
        // Clear out any previous panes
        d3.select(".reportArea").selectAll(".dijitTitlePane").remove();

        // Draw decision tree if available
        if (this.data.tree) {
          this.treeDiv = document.createElement('DIV');
          this.treeDiv.style.position = "relative";
          this.treeDiv.id = "treeDiv";
          this.treeDiv.style.width = "100%";
          this.treeDiv.style.height = "100%";
          var tp = new TitlePane({
            title : "Decision Tree",
            content : this.treeDiv
          });
          this.targetDiv.appendChild(tp.domNode);
          tp.domNode.style.backgroundColor = options.bgColor;
          tp.startup();
          // Now, draw the decision tree
          this.resize();
        }
        
        // Add additional panes for model outputs such as Model Accuracy and Confusion Matrix
        var weka = this.data.weka;
        for ( var i = 0; i < weka.length; i++) {
          var tp = new TitlePane({
            title : weka[i].title,
            content : '<pre>' + weka[i].content + '</pre>',
            open : (!this.data.tree && i == 0) // Open the first pane if tree is not present
          });
          this.targetDiv.appendChild(tp.domNode);
          tp.domNode.style.backgroundColor = options.bgColor;
          tp.startup();
        }

        // Add pane for exporting model binary output for PDI
        if (this.options['includeExportPane']) {
          var tp = new TitlePane(
            {
            title : "Export Model",
            content : 'You can <a style="text-decoration: underline;" href="javascript:exportModel();">export</a> this Weka model and use it in a Penthao Data Integration transformation.'
              + '  See <a style="text-decoration: underline;" target="_blank" href="http://wiki.pentaho.com/display/DATAMINING/Using+the+Weka+Scoring+Plugin">Weka Scoring Plugin</a> for more details.',
            open : false
            });
          tp.domNode.class = "exportModel";
          this.targetDiv.appendChild(tp.domNode);
          tp.domNode.style.backgroundColor = options.bgColor;
          tp.startup();  
        }
      };
      
      /**
       * Draws the decision tree into the target DIV 
       */
      this.resize = function() {
        
        if (!this.data.tree)
          return;
        
        this.width = this.targetDiv.offsetWidth - 80;
        this.height = this.targetDiv.offsetHeight - 50;

        d3.select("svg").remove();

        // Create the SVG document element
        var svg = d3.select("#treeDiv").append("svg").attr("width", this.width).attr("height", this.height)
              .style("padding", "40px").append("g").attr("transform", "translate(40,0)");

        // Runs D3 tree layout to compute position of all nodes in tree
        var treeLayout = d3.layout.tree().size([ this.height, this.width - 260 ]);
        var nodes = treeLayout.nodes(this.data.tree);
        
        // Get links and create SVG path to connect the decision tree nodes
        var links = treeLayout.links(nodes);
        var diagonal = d3.svg.diagonal().projection(function(d) {return [ d.y, d.x ];});
        svg.selectAll(".link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal);
        
        var _this = this;
        // Create SVG group for each decision tree node which contains a SVG circle and text
        var node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node")
          .style("font-size", '' + this.options.labelSize + "pt")
          .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
            })
          .on("dblclick", function(d) {
            // Register a double click event handler on each node that when clicked filters on that node
            if (!d.parent) {
              alert("Unable to filter on root node.");
              return;
            }
            if (d.name[0] == '<' || d.name[0] == '>') {
              alert("Filter not implemented on measures");
              return;
            }
            // Based on the clicked node, parse out the MDX level name and member name.
            var parentLevel = null;
            if (!d.parent.parent) {
              parentLevel = d.parent.name;
            } else {
              parentLevel = d.parent.name.match(/.+\s(.+)\s:\s(.+)/)[2];
            }
            var result = d.name.match(/^=\s(.+)\s:/);
            var level = null;
            for ( var x = 0; x < cv.getFieldHelp().fieldListItems.length; x++) {
              var formula = cv.getFieldHelp().fieldListItems[x].attributes.getNamedItem("formula").value
              var result2 = formula.match(/\[([^\]]+)\].\[([^\]]+)\]/);
              if (result2[2] == parentLevel) {
                level = result2;
                break;
              }
            }
            if (!level)
              return;

            var levelMdx = level[0];
            var memberMdx = "[" + level[1] + "].[" + result[1] + "]"
            var caption = result[1];

            // Remove jQuery tooltip
            $('div.tipsy').remove();
            
            // Call Analyzer JS API to set filter for clicked on node
            analyzerApi.report.setFilters(levelMdx, [ {
              operator : "EQUAL",
              members : [ {
                formula : memberMdx,
                caption : caption
              } ]
              } ]);
            analyzerApi.operation.refreshReport();

            /**
             * Here is a container agnostic way to notify that an event has occurred.
             * This will notify any listeners registered with the VizController.
             *  
             * pentaho.events.trigger( _this, "select", 
             *        { source : _this, 
             *          selections : [{rowId:[levelMdx], rowItem:[memberMdx]}] 
             *        } );
             */
          });

        // If instance data is provided with the tree nodes, clicking on a node should show the instances.
        node.on("click", function(d) {
          if (d.data) {
            var win = window.open("", "Drillthrough Instance Data", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=800, top=100, left=100");
            win.document.body.innerHTML = "<pre>" + d.data + "</pre>";
          }
        });
        
        // Create function for sizing the decision tree nodes
        var maxInstancePerNode = d3.max(node[0], function(d) {
          return d.__data__.size ? d.__data__.size : 1;
        });
        var scaleFunction = d3.scale.sqrt().domain([ 0, maxInstancePerNode ]).range([ 4.5, 20 ]);

        // Add SVG circle to group and color accordingly
        node.append("circle").attr("r", function(d) {return d.children ? 4.5 : scaleFunction(d.size);})
          .style("fill", function color(d) {return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";});

        // Add SVG text to group
        node.append("text").attr("dx", function(d) {return d.children ? -8 : 8;})
          .attr("dy", 3).style("text-anchor", function(d) {return d.children ? "end" : "start";})
          .text(function(d) {return d.name;});

        // Add a tooltip to SVG circles that describes the node's branch
        $('svg circle').tipsy({
          gravity : 'w',
          html : true,
          title : function() {
            var d = this.__data__;
            if (!d.parent)
              return "";
            var tooltip = d.name;
            var orig = d;
            while (d.parent) {
              d = d.parent;
              tooltip = d.name + " " + tooltip;
            }
            tooltip = tooltip.replace(/ : /gi, "<br>and ");

            var lastLineIdx = tooltip.lastIndexOf("<br>and ");
            if (lastLineIdx != -1) {
              var lastLine = tooltip.substring(lastLineIdx + 5);
              if (orig.children)
                tooltip = tooltip.substr(0, lastLineIdx);
              else {
                var front = "Target Value: <b>" + orig.label + "</b><br>Instances: " + orig.size;
                if (orig.misclassified)
                front = front + "<br>Misclassified: " + orig.misclassified;
                tooltip = front + "<br><hr>" + tooltip.substr(0, lastLineIdx);
              }
              return tooltip;
            }
          }
          });
		  
      };

	  };

	});
